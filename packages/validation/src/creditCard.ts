import * as z from 'zod/v4';
import checkLuhn from './utils/luhn';

export enum CreditCardType {
  Standard = 'Standard',
  Visa = 'Visa',
  Master = 'Master',
  Amex = 'Amex'
}

const REGEX_NUMBERS: Record<CreditCardType, RegExp> = {
  [CreditCardType.Standard]: /^\d{12,}$/,
  [CreditCardType.Visa]: /^4\d{15}|4\d{12}$/,
  [CreditCardType.Master]: /^5\d{15}$/,
  [CreditCardType.Amex]: /^3\d{14}$/,
};

const REGEX_CSC: Record<CreditCardType, RegExp> = {
  [CreditCardType.Standard]: /^[0-9]{3,4}$/,
  [CreditCardType.Visa]: /^[0-9]{3}$/,
  [CreditCardType.Master]: /^[0-9]{3}$/,
  [CreditCardType.Amex]: /^[0-9]{4}$/,
};

export const CSCSchema = (type: CreditCardType) => z
  .string({
    error: 'creditCardCSCc.required',
  }).regex(REGEX_CSC[type], {
    error: 'creditCardCSC.invalid',
  });

export const CreditCardNumberSchema = (type: CreditCardType) => z
  .string({
    error: 'creditCardNumber.required',
  }).refine(value => {
    const regex = REGEX_NUMBERS[type];
    return regex.test(value) && checkLuhn(value);
  }, {
    error: 'creditCardNumber.invalid',
  });

export const CreditCardExpirationDateSchema = z.string({
  error: 'creditCardExpiry.required',
}).refine(value => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  if (!regex.test(value)) {
    return false;
  }

    const [ month, year ] = value.split('/').map(Number);
    if (month === undefined || year === undefined) {
      return false;
    }
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed

    return (year > currentYear) || (year === currentYear && month >= currentMonth);
  }, {
    error: 'creditCardExpiry.invalid',
  });

export const CreditCardHolderNameSchema = z.string({
  error: 'cardHolder.required',
}).nonempty({
  error: 'cardHolder.required',
});

/**
 * Creates a credit card schema based on the type of credit card.
 * @param type The type of credit card (Visa, MasterCard, Amex, or Standard).
 */
export const CreditCardSchemaByType = (type: CreditCardType) => z.object({
  cardHolderName: CreditCardHolderNameSchema,
  number: CreditCardNumberSchema(type),
  csc: CSCSchema(type),
  expirationDate: CreditCardExpirationDateSchema,
  acceptTerms: z.boolean().refine(val => val, {
    message: 'acceptTerms.required',
  }),
});

export const VisaSchema = CreditCardSchemaByType(CreditCardType.Visa);
export const MasterCardSchema = CreditCardSchemaByType(CreditCardType.Master);
export const AmexSchema = CreditCardSchemaByType(CreditCardType.Amex);

/**
 * Standard credit card schema that supports Visa, MasterCard, and Amex.
 */
export const CreditCardSchema = CreditCardSchemaByType(CreditCardType.Standard)
  .refine(({ number }) => {
    const types = [ CreditCardType.Master, CreditCardType.Visa, CreditCardType.Amex ];
    const type = types.find(key => REGEX_NUMBERS[key as CreditCardType].test(number));

    return Boolean(type);
  }, {
    error: 'creditCardNumber.invalid',
    path: [ 'number' ],
  }).refine(({ number, csc }) => {
    const types = [ CreditCardType.Master, CreditCardType.Visa, CreditCardType.Amex ];
    const type = types.find(key => REGEX_NUMBERS[key as CreditCardType].test(number));

    if (!type) {
      return false;
    }

    return REGEX_CSC[type].test(csc);
  }, {
    error: 'creditCardCSC.invalid',
    path: [ 'csc' ],
  });
