import { z } from "zod";

export const Password = z
  .string({
    invalid_type_error: "password.required",
    required_error: "password.required",
  })
  .nonempty({
    message: "password.required",
  })
  .min(1, {
    message: "password.required",
  });

export const ComplexPassword = Password
  .min(1, {
    message: "password.required",
  })
  .min(8, {
    message: "password.invalid",
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
      message: "password.invalid",
    },
  );
