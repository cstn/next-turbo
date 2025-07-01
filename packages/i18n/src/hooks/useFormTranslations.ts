import { useTranslations } from 'next-intl';

export const useFormTranslations = (namespace: string = 'form') => {
  const t = useTranslations(namespace);

  return t;
}

