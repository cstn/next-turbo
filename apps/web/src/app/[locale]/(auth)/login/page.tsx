import { LocaleProps } from '@/utils/props';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FC } from 'react';
import Login from './_components/login';
import { Link } from '@/i18n/navigation';

type SearchParams = Promise<{
  provider?: string,
  callbackUrl?: string,
  error?: string,
  redirectTo?: string,
}>;

type Props = LocaleProps & {
  searchParams: SearchParams,
};

const LoginPage: FC<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const t = await getTranslations('login');
  setRequestLocale(params.locale);

  const error = searchParams?.error;
  const hasError = typeof error === 'string' && Boolean(error);

  return (
    <div>
      <h1 className="mb-4">{t('headline')}</h1>
      <p className="my-4">{t('intro')}</p>

      <Login/>

      {hasError && (
        <p className="text-destructive">{t(error)}</p>
      )}

      <p className="my-4">
        <Link className="underline" href="/request-password">{t('forgotPassword')}</Link>
      </p>
      <p className="my-4">
        {t.rich('register', {
          link: (chunks) => <Link className="underline" href="/register">{chunks}</Link>,
        })}
      </p>
    </div>
  );
};

export default LoginPage;
