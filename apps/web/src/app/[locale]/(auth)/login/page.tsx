import { LocaleProps } from '@/utils/props';
import { setRequestLocale } from 'next-intl/server';
import { FC } from 'react';
import Login from './_components/login';

type Props = LocaleProps;

const LoginPage: FC<Props> = async (props) => {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
