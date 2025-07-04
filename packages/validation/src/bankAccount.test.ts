import { describe, expect, it } from 'vitest';
import { BankAccountSchema } from './bankAccount';

describe('Bank account Validation', () => {
  it('should accept a valid bank account', () => {
    const validAccount = {
      accountHolderName: 'Carsten Stein',
      iban: 'DE12500105170648489890',
      bic: 'DEUTDEBBXXX',
      acceptTerms: true,
    };
    const result = BankAccountSchema.safeParse(validAccount);

    expect(result.success).toBeTruthy();
  });

  it('should reject a valid bank without accepting the terms and conditions', () => {
    const validAccount = {
      accountHolderName: 'Carsten Stein',
      iban: 'DE12500105170648489890',
      bic: 'DEUTDEBBXXX',
      acceptTerms: false,
    };
    const result = BankAccountSchema.safeParse(validAccount);

    expect(result.success).toBeFalsy();
    expect(result.error?.issues?.[0]?.message).toEqual('acceptTerms.required');
  });

  it('should reject a bank account without holder name', () => {
    const invalidAccount = {
      accountHolderName: '',
      iban: 'DE12500105170648489890',
      bic: 'DEUTDEBBXXX',
      acceptTerms: true,
    };
    const result = BankAccountSchema.safeParse(invalidAccount);

    expect(result.success).toBeFalsy();
    expect(result.error?.issues?.[0]?.message).toEqual('accountHolder.required');
  });

  it('should reject a bank account with invalid IBAN', () => {
    const invalidAccount = {
      accountHolderName: 'Carsten Stein',
      iban: 'DE13500105170648489890',
      bic: 'DEUTDEBBXXX',
      acceptTerms: true,
    };
    const result = BankAccountSchema.safeParse(invalidAccount);

    expect(result.success).toBeFalsy();
    expect(result.error?.issues?.[0]?.message).toEqual('iban.invalid');
  });

  it('should reject a bank account with invalid BIC', () => {
    const invalidAccount = {
      accountHolderName: 'Carsten Stein',
      iban: 'DE12500105170648489890',
      bic: 'DEUTDEBBXX',
      acceptTerms: true,
    };
    const result = BankAccountSchema.safeParse(invalidAccount);

    expect(result.success).toBeFalsy();
    expect(result.error?.issues?.[0]?.message).toEqual('bic.invalid');
  });

  it('should reject a bank account with different country in IBAN and BIC', () => {
    const invalidAccount = {
      accountHolderName: 'Carsten Stein',
      iban: 'DE12500105170648489890',
      bic: 'DEUTFRBBXXX',
      acceptTerms: true,
    };
    const result = BankAccountSchema.safeParse(invalidAccount);
    expect(result.success).toBeFalsy();
    expect(result.error?.issues?.[0]?.message).toEqual('bankAccount.countryMismatch');
  });
});
