import { z } from 'zod';

// IIIICCLLXXX, I = Institution, C = Country, L = Location, X = Branch, XXX is optional
const REGEX_SWIFT = /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/;

export const BICSchema = z
  .string({
    required_error: 'bic.required',
    invalid_type_error: 'bic.invalid',
  })
  .regex(REGEX_SWIFT, {
    message: 'bic.invalid',
  });


export const LocaleBICSchema = (country: string) => BICSchema
  .refine((value) => {
    const countryCode = value.slice(4, 6).toUpperCase();
    return countryCode === country.toUpperCase();
  }, {
    message: 'bic.countryMismatch',
  });
