import { z } from "zod";
import { UsernameSchema } from "./username";
import { PasswordSchema } from "./password";

export const CredentialsSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});
