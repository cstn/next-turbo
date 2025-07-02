import { z } from "zod";

export const UsernameSchema = z
  .string({
    invalid_type_error: "username.required",
    required_error: "username.required",
  })
  .nonempty({
    message: "username.required",
  });

export const NewUsernameSchema = UsernameSchema
  .min(3, {
    message: "username.minLength",
  })
  .max(32, {
    message: "username.maxLength",
  })
  .regex(/^[a-zA-Z0-9_.-]+$/, {
      message: "username.invalid",
    },
  );
