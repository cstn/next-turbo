import config from '@/config';
import { defineRouting, type LocalePrefixMode } from 'next-intl/routing';

export const routing = defineRouting({
  localeCookie: {
    // @see https://next-intl.dev/blog/next-intl-4-0#gdpr-compliance
    // maxAge: 60 * 60 * 24 * 365,
  },
  localePrefix: config.LOCALE_PREFIX as LocalePrefixMode,

  // A list of all locales that are supported
  locales: config.AVAILABLE_LOCALES,

  // Used when no locale matches
  defaultLocale: config.DEFAULT_LOCALE,
});

