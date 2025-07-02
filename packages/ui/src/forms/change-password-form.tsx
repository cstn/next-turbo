'use client';

import { FC } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';
import { ComplexPassword, PasswordSchema } from '@cstn/validation/password';
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
  onSubmit: (values: z.infer<typeof FormSchema>) => Promise<void>;
};

const FormSchema = z.object({
  currentPassword: PasswordSchema,
  newPassword: ComplexPassword,
  confirmPassword: ComplexPassword,
}).refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
  message: 'confirmPassword.match',
  path: [ 'confirmPassword' ],
});

export const ChangePasswordForm: FC<Props> = ({ className, classNames, onSubmit, onError }) => {
  const t = useFormTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('currentPassword.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="current-password" className={classNames?.input} type="password"
                       placeholder={t('currentPassword.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('currentPassword.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('newPassword.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="new-password" className={classNames?.input} type="password"
                       placeholder={t('newPassword.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('newPassword.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('confirmPassword.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="new-password" className={classNames?.input} type="password"
                       placeholder={t('confirmPassword.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('confirmPassword.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage className="my-4">
            {t(form.formState.errors.root.message || 'form.failed')}
          </FormMessage>
        )}
        <Button disabled={form.formState.isSubmitting} type="submit">{t('changePassword.submit')}</Button>
      </form>
    </Form>
  );
};
