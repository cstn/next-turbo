import { z } from "zod";

export const Username = z
  .string({
    invalid_type_error: "usernameRequired",
    required_error: "usernameRequired",
  })
  .min(1, {
    message: "usernameRequired",
  });
