import { z } from 'zod';
import { Username } from './username';
import { Password } from './password';

export const Credentials = z.object({
  username: Username,
  password: Password,
});
