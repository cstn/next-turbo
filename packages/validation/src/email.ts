import { z } from "zod";

export const Email = z
  .string({
    invalid_type_error: "email.required",
    required_error: "email.required",
  })
  .email({
    message: "email.required",
  });
