import * as z from 'zod/v4';

export const PasswordSchema = z
  .string({
    error: "password.required",
  })
  .nonempty({
    error: "password.required",
  });

export const ComplexPassword = PasswordSchema
  .nonempty({
    error: "password.required",
  })
  .min(8, {
    error: "password.invalid",
  })
  .refine(
    (value: string) => {
      if (!value || value.length < 8) {
        return true;
      }
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasNonAlphas = /\W/.test(value);

      return hasUpperCase && hasLowerCase && hasNumbers && hasNonAlphas;
    },
    {
      error: "password.invalid",
    },
  );
