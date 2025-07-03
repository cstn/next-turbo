'use client';

import { FC } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/v4';
import clsx from 'clsx';
import { UsernameSchema } from '@cstn/validation/username';
import { PasswordSchema } from '@cstn/validation/password';
import { useFormTranslations } from '@cstn/i18n/hooks/useFormTranslations';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@cstn/ui/components/form';
import { Button } from '@cstn/ui/components/button';
import { Input } from '@cstn/ui/components/input';
import { PropsWithStyle } from '@cstn/ui/props';

type Props = PropsWithStyle & {
  onError?: (errors: FieldErrors) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => Promise<void> | void;
};

const FormSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});

export const LoginForm: FC<Props> = ({ className, classNames, onSubmit, onError }) => {
  const t = useFormTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await onSubmit(values);
    } catch (ex) {
      form.setError('root', {
        message: (ex as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form className={clsx('w-full max-w-sm', className, classNames?.root)}
            onSubmit={form.handleSubmit(handleSubmit, onError)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('username.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="username" className={classNames?.input} placeholder={t('username.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('username.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('password.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="current-password" className={classNames?.input} type="password"
                       placeholder={t('password.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('password.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage className="my-4">
            {t(form.formState.errors.root.message || 'form.failed')}
          </FormMessage>
        )}
        <Button disabled={form.formState.isSubmitting} type="submit">{t('login.submit')}</Button>
      </form>
    </Form>
  );
};
