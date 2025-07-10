'use client';

import { FC } from 'react';
import { RequestPasswordReset } from '@cstn/ui/forms/request-password-reset-form';

const RequestPassword: FC = () => (
  <RequestPasswordReset onSubmit={() => console.log('Requested password reset')}/>
);

export default RequestPassword;
