import { type Config } from './types';

const DEFAULT_LOCALE = 'en';
const AVAILABLE_LOCALES = ['en', 'de'];
const LOCALE_PREFIX = AVAILABLE_LOCALES.length > 1 ? 'always' : 'as-needed';

const config: Config = {
  DEFAULT_LOCALE,
  AVAILABLE_LOCALES,
  LOCALE_PREFIX,
};

export default config;

