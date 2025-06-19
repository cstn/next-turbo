import { z } from "zod";

export const Password = z
  .string({
    invalid_type_error: "passwordRequired",
    required_error: "passwordRequired",
  })
  .min(1, {
    message: "passwordRequired",
  });

export const ComplexPassword = z
  .string({
    invalid_type_error: "passwordRequired",
    required_error: "passwordRequired",
  })
  .min(1, {
    message: "passwordRequired",
  })
  .min(8, {
    message: "passwordInvalid",
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
      message: "passwordInvalid",
    },
  );
