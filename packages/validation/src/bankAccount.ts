import { z } from 'zod';
import { IBANSchema, LocaleIBANSchema } from './iban';
import { BICSchema, LocaleBICSchema } from './bic';

export const BankAccountSchema = z.object({
  iban: IBANSchema,
  bic: BICSchema.or(z.literal('')),
  accountHolderName: z.string({
    required_error: 'bankAccount.accountHolderName.required',
    invalid_type_error: 'bankAccount.accountHolderName.invalid',
  }).nonempty({
    message: 'bankAccount.accountHolderName.required',
  }),
}).refine(({ iban, bic }) => {
  if (!bic) {
    return true;
  }
  const countryCode = bic.slice(4, 6).toUpperCase();

  return LocaleIBANSchema(countryCode).safeParse(iban).success;
}, {
  message: 'bankAccount.countryMismatch',
  path: [ 'bic', 'iban' ],
});

export const LocaleBankAccountSchema = (country: string) => z.object({
  iban: LocaleIBANSchema(country),
  bic: z.optional(LocaleBICSchema(country)),
  accountHolderName: z.string({
    required_error: 'bankAccount.accountHolderName.required',
    invalid_type_error: 'bankAccount.accountHolderName.invalid',
  }).nonempty({
    message: 'bankAccount.accountHolderName.required',
  })
});
