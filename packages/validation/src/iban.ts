import { z } from 'zod';
import isValidChecksum from './utils/checksum';

const REGEX_PATTERNS: Record<string, RegExp> = {
  AL: /^AL\d{10}[0-9A-Z]{16}$/,
  AD: /^AD\d{10}[0-9A-Z]{12}$/,
  AT: /^AT\d{18}$/,
  BH: /^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$/,
  BE: /^BE\d{14}$/,
  BA: /^BA\d{18}$/,
  BG: /^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$/,
  HR: /^HR\d{19}$/,
  CY: /^CY\d{10}[0-9A-Z]{16}$/,
  CZ: /^CZ\d{22}$/,
  DK: /^DK\d{16}$/,
  FO: /^FO\d{16}$/,
  GL: /^GL\d{16}$/,
  DO: /^DO\d{2}[0-9A-Z]{4}\d{20}$/,
  EE: /^EE\d{18}$/,
  FI: /^FI\d{16}$/,
  FR: /^FR\d{12}[0-9A-Z]{11}\d{2}$/,
  GE: /^GE\d{2}[A-Z]{2}\d{16}$/,
  DE: /^DE\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}|DE\d{20}$/,
  GI: /^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$/,
  GR: /^GR\d{9}[0-9A-Z]{16}$/,
  HU: /^HU\d{26}$/,
  IS: /^IS\d{24}$/,
  IE: /^IE\d{2}[A-Z]{4}\d{14}$/,
  IL: /^IL\d{21}$/,
  IT: /^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$/,
  KZ: /^KZ\d{5}[0-9A-Z]{13}$/,
  KW: /^KW\d{2}[A-Z]{4}22!$/,
  LV: /^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$/,
  LB: /^LB\d{6}[0-9A-Z]{20}$/,
  LI: /^LI\d{7}[0-9A-Z]{12}$/,
  LT: /^LT\d{18}$/,
  LU: /^LU\d{5}[0-9A-Z]{13}$/,
  MK: /^MK\d{5}[0-9A-Z]{10}\d{2}$/,
  MT: /^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$/,
  MR: /^MR13\d{23}$/,
  MU: /^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$/,
  MC: /^MC\d{12}[0-9A-Z]{11}\d{2}$/,
  ME: /^ME\d{20}$/,
  NL: /^NL\d{2}[A-Z]{4}\d{10}$/,
  NO: /^NO\d{13}$/,
  PL: /^PL\d{26}$/,
  PT: /^PT\d{23}$/,
  RO: /^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$/,
  SM: /^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$/,
  SA: /^SA\d{4}[0-9A-Z]{18}$/,
  RS: /^RS\d{20}$/,
  SK: /^SK\d{22}$/,
  SI: /^SI\d{17}$/,
  ES: /^ES\d{22}$/,
  SE: /^SE\d{22}$/,
  CH: /^CH\d{7}[0-9A-Z]{12}$/,
  TN: /^TN59\d{20}$/,
  TR: /^TR\d{7}[0-9A-Z]{17}$/,
  AE: /^AE\d{21}$/,
  GB: /^GB\d{2}[A-Z]{4}\d{14}$/,
};

export const IBAN = z
  .string({
    message: 'iban.invalid',
  }).nonempty({
    message: 'iban.required',
  })
  .refine((value) => {
    const country = Object.keys(REGEX_PATTERNS).find((code: string) => REGEX_PATTERNS[code]?.test(value));

    if (!country) {
      return false;
    }

    return isValidChecksum(value);
  }, {
    message: 'iban.invalid',
  });

export const IBANWithCountry = (country: string) => z
  .string({
    message: 'iban.invalid',
  }).nonempty({
    message: 'iban.required',
  }).refine((value) => {
    const pattern = REGEX_PATTERNS[country.toUpperCase()];

    if (!pattern || !pattern.test(value)) {
      return false;
    }

    return isValidChecksum(value);
  }, {
    message: 'iban.invalid',
  });
