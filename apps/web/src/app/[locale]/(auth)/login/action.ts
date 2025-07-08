import { signIn } from 'next-auth/react';
import { z } from 'zod/v4';
import { CredentialsSchema } from '@cstn/validation/credentials';
import { credentialsProviders } from '@/auth/options';

const FormData = CredentialsSchema;

const signInAction = async (_prevState: never, formData: FormData) => {
  const values = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const validated = FormData.safeParse(values);
  const errors = !validated.success ? z.flattenError(validated.error) : undefined;
  if (Object.values(errors || {}).some(Boolean)) {
    return { errors, values };
  }

  try {
    await signIn(credentialsProviders.id, {
      username: values.username,
      password: values.password,
      redirect: true,
      callbackUrl: `/?auth=${credentialsProviders.id}`,
    });

    return {
      values,
    };
  } catch (ex) {
    return {
      errors: {
        formErrors: ['invalidCredentials'],
        fieldErrors: {
          root: (ex as Error).message,
        },
      },
      values,
    };
  }
};
export { signInAction };
