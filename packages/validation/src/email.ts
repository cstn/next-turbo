import * as z from 'zod/v4';

export const EmailSchema = z
  .email({
    error: "email.required",
  });
