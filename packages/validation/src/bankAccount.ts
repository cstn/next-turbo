import * as z from 'zod/v4';
import { IBANSchema, LocaleIBANSchema } from './iban';
import { BICSchema, LocaleBICSchema } from './bic';

export const BankAccountSchema = z.object({
  iban: IBANSchema,
  bic: BICSchema,
  accountHolderName: z.string({
    error: 'accountHolder.required',
  }).nonempty({
    error: 'accountHolder.required',
  }),
  acceptTerms: z.boolean().refine(val => val, {
    message: 'acceptTerms.required',
  }),
}).refine(({ iban, bic }) => {
  if (!bic) {
    return true;
  }
  const countryCode = bic.slice(4, 6).toUpperCase();

  return LocaleIBANSchema(countryCode).safeParse(iban).success;
}, {
  error: 'bankAccount.countryMismatch',
  path: [ 'bic' ],
});

export const LocaleBankAccountSchema = (country: string) => z.object({
  iban: LocaleIBANSchema(country),
  bic: z.optional(LocaleBICSchema(country)),
  accountHolderName: z.string({
    error: 'accountHolder.required',
  }).nonempty({
    error: 'accountHolder.required',
  })
});
