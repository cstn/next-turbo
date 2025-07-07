import { LocaleProps } from '@/utils/props';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FC } from 'react';
import Register from './_components/register';
import { Link } from '@/i18n/navigation';

type Props = LocaleProps;

const LoginPage: FC<Props> = async (props) => {
  const params = await props.params;
  const t = await getTranslations('register');

  setRequestLocale(params.locale);

  return (
    <div>
      <h1>{t('title')}</h1>

      <Register />

      <p className="my-4">
        {t.rich('alreadyHaveAccount', {
          link: (chunks) => <Link className="underline" href="/login">{chunks}</Link>,
        })}
      </p>
    </div>
  );
}

export default LoginPage;
