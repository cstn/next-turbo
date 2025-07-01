import { z } from 'zod';

const ConfigSchema = z.object({
  DEBUG: z.boolean().optional(),
  DEFAULT_LOCALE: z.string(),
  AVAILABLE_LOCALES: z.array(z.string()),
  LOCALE_PREFIX: z.enum([ 'always', 'as-needed' ]),
});
export type Config = z.infer<typeof ConfigSchema>;

