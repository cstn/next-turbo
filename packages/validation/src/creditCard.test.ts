import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import {
  CSCSchema,
  CreditCardNumberSchema,
  CreditCardExpirationDateSchema,
  CreditCardType,
  VisaSchema,
  MasterCardSchema,
  AmexSchema,
  CreditCardSchema,
} from './creditCard';

describe('Credit Card validation', () => {
  describe('CVC Validation', () => {
    it('should validate visa card CVC', () => {
      const cscSchema = CSCSchema(CreditCardType.Visa);
      expect(cscSchema.safeParse('123').success).toBe(true);
      expect(cscSchema.safeParse('12').success).toBe(false);
      expect(cscSchema.safeParse('1234').success).toBe(false);
    });

    it('should validate master card CVC', () => {
      const cscSchema = CSCSchema(CreditCardType.Master);
      expect(cscSchema.safeParse('123').success).toBe(true);
      expect(cscSchema.safeParse('12').success).toBe(false);
      expect(cscSchema.safeParse('1234').success).toBe(false);
    });

    it('should validate Amex CVC', () => {
      const cscSchema = CSCSchema(CreditCardType.Amex);
      expect(cscSchema.safeParse('1234').success).toBe(true);
      expect(cscSchema.safeParse('123').success).toBe(false);
    });
  });

  describe('Credit Card Number Validation', () => {
    it('should validate Visa card numbers', () => {
      const numberSchema = CreditCardNumberSchema(CreditCardType.Visa);
      expect(numberSchema.safeParse('4532015112830366').success).toBe(true);
      expect(numberSchema.safeParse('5532015112830366').success).toBe(false);
    });

    it('should validate MasterCard numbers', () => {
      const numberSchema = CreditCardNumberSchema(CreditCardType.Master);
      expect(numberSchema.safeParse('5555555555554444').success).toBe(true);
      expect(numberSchema.safeParse('4532015112830366').success).toBe(false);
    });

    it('should validate Amex numbers', () => {
      const numberSchema = CreditCardNumberSchema(CreditCardType.Amex);
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
      expect(CreditCardExpirationDateSchema.safeParse('08/25').success).toBe(true);
      expect(CreditCardExpirationDateSchema.safeParse('12/26').success).toBe(true);
    });

    it('should reject expired dates', () => {
      expect(CreditCardExpirationDateSchema.safeParse('06/25').success).toBe(false);
      expect(CreditCardExpirationDateSchema.safeParse('12/24').success).toBe(false);
    });

    it('should reject invalid formats', () => {
      expect(CreditCardExpirationDateSchema.safeParse('13/25').success).toBe(false);
      expect(CreditCardExpirationDateSchema.safeParse('00/25').success).toBe(false);
      expect(CreditCardExpirationDateSchema.safeParse('1225').success).toBe(false);
    });
  });

  describe('Credit Card Schema Validation', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-07-01'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe('Visa', () => {
      it('should reject missing account holder name', () => {
        const validCard = {
          cardHolderName: '',
          number: '4012888888881881',
          csc: '123',
          expirationDate: '12/25',
          acceptTerms: true,
        };
        expect(VisaSchema.safeParse(validCard).success).toBeFalsy();
      });

      it('should reject missing acceptance of terms and conditions', () => {
        const validCard = {
          cardHolderName: 'John Doe',
          number: '4012888888881881',
          csc: '123',
          expirationDate: '12/25',
          acceptTerms: false,
        };
        expect(VisaSchema.safeParse(validCard).success).toBeFalsy();
      });

      it('should validate valid Visa card', () => {
        const validCard = {
          cardHolderName: 'John Doe',
          number: '4012888888881881',
          csc: '123',
          expirationDate: '12/25',
          acceptTerms: true,
        };
        expect(VisaSchema.safeParse(validCard).success).toBe(true);
      });
    });

    describe('MasterCard', () => {
      it('should validate valid MasterCard', () => {
        const validCard = {
          cardHolderName: 'John Doe',
          number: '5555555555554444',
          csc: '123',
          expirationDate: '12/25',
          acceptTerms: true,
        };
        expect(MasterCardSchema.safeParse(validCard).success).toBe(true);
      });
    });

    describe('Amex', () => {
      it('should validate valid Amex card', () => {
        const validCard = {
          cardHolderName: 'John Doe',
          number: '371449635398431',
          csc: '1234',
          expirationDate: '12/25',
          acceptTerms: true,
        };
        expect(AmexSchema.safeParse(validCard).success).toBe(true);
      });
    });
  });

  describe('Auto detected card type', () => {
    it('should validate valid Visa card', () => {
      const validCard = {
        cardHolderName: 'John Doe',
        number: '4012888888881881',
        csc: '123',
        expirationDate: '12/25',
        acceptTerms: true,
      };
      expect(CreditCardSchema.safeParse(validCard).success).toBe(true);
    });

    it('should validate valid MasterCard', () => {
      const validCard = {
        cardHolderName: 'John Doe',
        number: '5555555555554444',
        csc: '123',
        expirationDate: '12/25',
        acceptTerms: true,
      };
      expect(CreditCardSchema.safeParse(validCard).success).toBe(true);
    });

    it('should validate valid Amex card', () => {
      const validCard = {
        cardHolderName: 'John Doe',
        number: '371449635398431',
        csc: '1234',
        expirationDate: '12/25',
        acceptTerms: true,
      };
      expect(CreditCardSchema.safeParse(validCard).success).toBe(true);
    });

    it.each([
      '',
      '555555555555444',
      '9555555555554444'
    ])('should reject invalid credit card number "%s"', (number) => {
      const validCard = {
        cardHolderName: 'John Doe',
        number,
        csc: '123',
        expirationDate: '12/25',
        acceptTerms: true,
      };

      const result = CreditCardSchema.safeParse(validCard);
      expect(result.success).toBeFalsy();
      expect(result.error?.issues?.[0]?.message).toBe('creditCardNumber.invalid');
    });

    it('should reject invalid csc', () => {
      const validCard = {
        cardHolderName: 'John Doe',
        number: '5555555555554444',
        csc: '1234',
        expirationDate: '12/25',
        acceptTerms: true,
      };

      const result = CreditCardSchema.safeParse(validCard);
      expect(result.success).toBeFalsy();
      expect(result.error?.issues?.[0]?.message).toBe('creditCardCSC.invalid');
    });
  });
});

