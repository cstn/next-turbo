import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import deMessages from '../messages/de.json';
import enMessages from '../messages/en.json';

const messages: Record<string, object> = {
  de: deMessages,
  en: enMessages,
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const libMessages = (await import(`../../../../packages/i18n/src/messages/${locale}.json`, { assert: { type: 'json' } })).default;

  return {
    locale,
    messages: {
      ...libMessages,
      ...messages[locale],
    },
  };
});
