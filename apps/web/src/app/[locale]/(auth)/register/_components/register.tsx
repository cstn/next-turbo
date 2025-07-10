'use client';

import { FC } from 'react';
import { RegisterForm } from '@cstn/ui/forms/register-form';

const Register: FC = () => (
  <RegisterForm privacyUrl="https://demo.cast-it.de/en/privacy" termsUrl="https://demo.cast-it.de/en/terms"
                onSubmit={() => {
                  console.log('Registered');
                }}/>
);

export default Register;
