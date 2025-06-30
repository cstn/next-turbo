import { Decorator } from '@storybook/react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { useMemo } from 'react';
// @ts-expect-error json
import deMessages from '@cstn/i18n/messages/de.json';
// @ts-expect-error json
import enMessages from '@cstn/i18n/messages/en.json';

const localizedMessages: Record<string, AbstractIntlMessages> = {
  de: deMessages,
  en: enMessages,
};

const WithIntlDecorator: Decorator = (Story, context) => {
  const locale = context.globals?.locale || 'en';

  const messages = useMemo(() => localizedMessages[locale], [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Story />
    </NextIntlClientProvider>
  );
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      title: 'Locale',
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'de', title: 'Deutsch' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export default WithIntlDecorator;
