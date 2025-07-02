import { z } from 'zod';
import { IBANSchema, LocaleIBANSchema } from './iban';
import { BICSchema, LocaleBICSchema } from './bic';

export const BankAccountSchema = z.object({
  iban: IBANSchema,
  bic: BICSchema.optional(),
  accountHolderName: z.string({
    message: 'bankAccount.accountHolderName.invalid',
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
});

export const LocaleBankAccountSchema = (country: string) => z.object({
  iban: LocaleIBANSchema(country),
  bic: LocaleBICSchema(country).optional(),
  accountHolderName: z.string({
    message: 'bankAccount.accountHolderName.invalid',
  }).nonempty({
    message: 'bankAccount.accountHolderName.required',
  }),
});
