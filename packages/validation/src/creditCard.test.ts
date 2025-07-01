import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import {
  CVC,
  CreditCardNumber,
  CreditCardExpirationDate,
  CreditCardType,
  Visa,
  MasterCard,
  Amex,
} from './creditCard';

describe('Credit Card validation', () => {
  describe('CVC Validation', () => {
    it('should validate visa card CVC', () => {
      const cvcSchema = CVC(CreditCardType.Visa);
      expect(cvcSchema.safeParse('123').success).toBe(true);
      expect(cvcSchema.safeParse('12').success).toBe(false);
      expect(cvcSchema.safeParse('1234').success).toBe(false);
    });

    it('should validate master card CVC', () => {
      const cvcSchema = CVC(CreditCardType.Master);
      expect(cvcSchema.safeParse('123').success).toBe(true);
      expect(cvcSchema.safeParse('12').success).toBe(false);
      expect(cvcSchema.safeParse('1234').success).toBe(false);
    });

    it('should validate Amex CVC', () => {
      const cvcSchema = CVC(CreditCardType.Amex);
      expect(cvcSchema.safeParse('1234').success).toBe(true);
      expect(cvcSchema.safeParse('123').success).toBe(false);
    });
  });

  describe('Credit Card Number Validation', () => {
    it('should validate Visa card numbers', () => {
      const numberSchema = CreditCardNumber(CreditCardType.Visa);
      expect(numberSchema.safeParse('4532015112830366').success).toBe(true);
      expect(numberSchema.safeParse('5532015112830366').success).toBe(false);
    });

    it('should validate MasterCard numbers', () => {
      const numberSchema = CreditCardNumber(CreditCardType.Master);
      expect(numberSchema.safeParse('5555555555554444').success).toBe(true);
      expect(numberSchema.safeParse('4532015112830366').success).toBe(false);
    });

    it('should validate Amex numbers', () => {
      const numberSchema = CreditCardNumber(CreditCardType.Amex);
      expect(numberSchema.safeParse('378282246310005').success).toBe(true);
      expect(numberSchema.safeParse('4532015112830366').success).toBe(false);
    });
  });

  describe('Expiration Date Validation', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-07-01'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should validate valid expiration dates', () => {
      expect(CreditCardExpirationDate.safeParse('08/25').success).toBe(true);
      expect(CreditCardExpirationDate.safeParse('12/26').success).toBe(true);
    });

    it('should reject expired dates', () => {
      expect(CreditCardExpirationDate.safeParse('06/25').success).toBe(false);
      expect(CreditCardExpirationDate.safeParse('12/24').success).toBe(false);
    });

    it('should reject invalid formats', () => {
      expect(CreditCardExpirationDate.safeParse('13/25').success).toBe(false);
      expect(CreditCardExpirationDate.safeParse('00/25').success).toBe(false);
      expect(CreditCardExpirationDate.safeParse('1225').success).toBe(false);
    });
  });

  describe('Complete Credit Card Schema Validation', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-07-01'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should validate valid Visa card', () => {
      const validCard = {
        number: '4012888888881881',
        cvc: '123',
        expirationDate: '12/25',
      };
      expect(Visa.safeParse(validCard).success).toBe(true);
    });

    it('should validate valid MasterCard', () => {
      const validCard = {
        number: '5555555555554444',
        cvc: '123',
        expirationDate: '12/25',
      };
      expect(MasterCard.safeParse(validCard).success).toBe(true);
    });

    it('should validate valid Amex card', () => {
      const validCard = {
        number: '371449635398431',
        cvc: '1234',
        expirationDate: '12/25',
      };
      expect(Amex.safeParse(validCard).success).toBe(true);
    });
  });
});
