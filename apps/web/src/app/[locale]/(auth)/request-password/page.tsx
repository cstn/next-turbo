import { LocaleProps } from '@/utils/props';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FC } from 'react';
import RequestPassword from './_components/RequestPassword';
type Props = LocaleProps;

const LoginPage: FC<Props> = async (props) => {
  const params = await props.params;
  const t = await getTranslations('requestPassword');
  setRequestLocale(params.locale);

  return (
    <div>
      <h1 className="mb-4">{t('headline')}</h1>
      <p className="my-4">{t('intro')}</p>

      <RequestPassword/>
    </div>
  );
};

export default LoginPage;
