import { z } from 'zod';
import { IBAN, IBANWithCountry } from './iban';
import { BIC, BICWithCountry } from './bic';

export const BankAccount = z.object({
  iban: IBAN,
  bic: BIC.optional(),
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

  return IBANWithCountry(countryCode).safeParse(iban).success;
}, {
  message: 'bankAccount.countryMismatch',
});

export const BankAcountWithCountry = (country: string) => z.object({
  iban: IBANWithCountry(country),
  bic: BICWithCountry(country).optional(),
  accountHolderName: z.string({
    message: 'bankAccount.accountHolderName.invalid',
  }).nonempty({
    message: 'bankAccount.accountHolderName.required',
  }),
});
