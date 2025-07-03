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

const REGEX_CVC: Record<CreditCardType, RegExp> = {
  [CreditCardType.Standard]: /^[0-9]{3}$/,
  [CreditCardType.Visa]: /^[0-9]{3}$/,
  [CreditCardType.Master]: /^[0-9]{3}$/,
  [CreditCardType.Amex]: /^[0-9]{4}$/,
};

export const CVCSchema = (type: CreditCardType) => z
  .string({
    error: 'cvc.required',
  }).regex(REGEX_CVC[type], {
    error: 'cvc.invalid',
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
  error: 'creditCardExpirationDate.required',
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
  error: 'creditCardExpirationDate.invalid',
});

export const CreditCardSchema = (type: CreditCardType) => z.object({
  accountHolderName: z.string({
    error: 'creditCard.accountHolderName.required',
  }).nonempty({
    error: 'creditCard.accountHolderName.required',
  }),
  number: CreditCardNumberSchema(type),
  cvc: CVCSchema(type),
  expirationDate: CreditCardExpirationDateSchema,
});

export const VisaSchema = CreditCardSchema(CreditCardType.Visa);
export const MasterCardSchema = CreditCardSchema(CreditCardType.Master);
export const AmexSchema = CreditCardSchema(CreditCardType.Amex);
