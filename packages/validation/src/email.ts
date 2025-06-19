import { z } from "zod";

export const Email = z
  .string({
    invalid_type_error: "emailRequired",
    required_error: "emailRequired",
  })
  .email({
    message: "emailRequired",
  });
