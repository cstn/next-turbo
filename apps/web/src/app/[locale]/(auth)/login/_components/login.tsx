'use client';

import { FC, useState } from 'react';
import { LoginForm, FormValues } from '@cstn/ui/forms/login-form';
import { signIn } from 'next-auth/react';
import { credentialsProviders } from '@/auth/options';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const Login: FC = () => {
  const t = useTranslations('login');
  const [ error, setError ] = useState('');
  const router = useRouter();

  const handleLogin = async (values: FormValues) => {
    const result = await signIn(credentialsProviders.id, {
      username: values.username,
      password: values.password,
      redirect: false,
      callbackUrl: `/?auth=${credentialsProviders.id}`,
    });

    if (result?.error) {
      setError(t(result.error));
    } else {
      setError('');
      router.push('/dashboard');
    }
  };

  return (
    <LoginForm error={error} onSubmit={handleLogin}/>
  );
};

export default Login;
