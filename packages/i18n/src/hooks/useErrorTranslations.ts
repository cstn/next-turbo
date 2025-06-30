import { TranslationValues, useTranslations } from 'next-intl';

const translateErrors =
  (t: (key: string, values?: TranslationValues) => string) =>
  (errors: string[] | undefined, values?: TranslationValues) =>
    errors?.map((error: string) => t(error, values));

const useErrorTranslations = (namespace: string) => {
  const t = useTranslations(namespace);

  return translateErrors(t);
};

export default useErrorTranslations;
