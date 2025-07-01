'use client';

import { FC } from 'react';
import { LoginForm } from '@cstn/ui/components/login-form';

const Login: FC = () => (
  <LoginForm onSubmit={() => console.log('Logged in')}/>
);

export default Login;
