import { describe, expect, it } from "vitest";
import { BIC, BICWithCountry} from './bic';

describe('BIC Validation', () => {
  it.each(['DEUTDEFFXXX', 'BARCGB22XXX', 'BNPAFRPPXXX'])('should accept valid BIC %s', (value) => {
    const result = BIC.safeParse(value);
    expect(result.success).toBeTruthy();
  });

  it.each(['DEUTDEBBXXXX', ''])('should reject invalid BIC %s', (value) => {
    const result = BIC.safeParse(value);
    expect(result.success).toBeFalsy();
    expect(result.error?.issues?.[0]?.message).toBe('bic.invalid');
  });

  it.each`
    bic              | countryCode
    ${'DEUTDEBBXXX'} | ${'DE'}
    ${'BNPAFRPPXXX'} | ${'FR'}
  `('should accept $bic for country $country', ({ bic, countryCode }: { bic: string; countryCode: string }) => {
    const result = BICWithCountry(countryCode).safeParse(bic);
    expect(result.success).toBeTruthy();
  });

  it.each`
    bic              | countryCode
    ${'DEUTDEBBXXX'} | ${'FR'}
    ${'BNPAFRPPXXX'} | ${'DE'}
  `('should reject $bic for country $countryCode', ({ bic, countryCode }: { bic: string; countryCode: string }) => {
    const result = BICWithCountry(countryCode).safeParse(bic);
    expect(result.success).toBeFalsy();
    expect(result.error?.issues?.[0]?.message).toBe('bic.countryMismatch');
  });

});
