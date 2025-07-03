import * as z from 'zod/v4';

export const UsernameSchema = z
  .string({
    error: "username.required",
  })
  .nonempty({
    error: "username.required",
  });

export const NewUsernameSchema = UsernameSchema
  .min(3, {
    error: "username.minLength",
  })
  .max(32, {
    error: "username.maxLength",
  })
  .regex(/^[a-zA-Z0-9_.-]+$/, {
      error: "username.invalid",
    },
  );
