import * as z from 'zod/v4';
import { UsernameSchema } from "./username";
import { PasswordSchema } from "./password";

export const CredentialsSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});
