import * as z from 'zod/v4';

// IIIICCLLXXX, I = Institution, C = Country, L = Location, X = Branch, XXX is optional
const REGEX_SWIFT = /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/;

export const BICSchema = z
  .string({
    error: 'bic.required',
  }).refine((value) => value.length === 0 || REGEX_SWIFT.test(value), {
    error: 'bic.invalid',
  });

export const LocaleBICSchema = (country: string) => BICSchema
  .refine((value) => {
    const countryCode = value.slice(4, 6).toUpperCase();
    return countryCode === country.toUpperCase();
  }, {
    error: 'bic.countryMismatch',
  });
