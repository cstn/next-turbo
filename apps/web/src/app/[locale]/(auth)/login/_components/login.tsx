'use client';

import { FC, useActionState } from 'react';
import { LoginForm, FormValues } from '@cstn/ui/forms/login-form';
import { signInAction } from '@/app/[locale]/(auth)/login/action';

type State = {
  values: FormValues,
};

const initialState: State = {
  values: {
    username: '',
    password: '',
  },
};

const Login: FC = () => {
  const [state, action] = useActionState<State | undefined, FormData>(signInAction, initialState);

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);

    action(formData)
  }

  return (
    <LoginForm defaultValues={state?.values} onSubmit={handleSubmit} />
  );
};

export default Login;
