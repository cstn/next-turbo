'use client';

import { FC } from 'react';
import { LoginForm } from '@cstn/ui/forms/login-form';

const Login: FC = () => (
  <LoginForm onSubmit={() => console.log('Logged in')}/>
);

export default Login;
