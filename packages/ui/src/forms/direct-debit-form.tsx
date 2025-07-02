'use client';

import { FC } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';
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
import { BankAccountSchema } from '@cstn/validation/bankAccount';

type Props = PropsWithStyle & {
  onError?: (errors: FieldErrors) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => Promise<void> | void;
};

const FormSchema = BankAccountSchema.extend({
  acceptTerms: z.boolean().refine(val => val, {
    message: 'acceptTerms.required',
  }),
});

export const LoginForm: FC<Props> = ({ className, classNames, onSubmit, onError }) => {
  const t = useFormTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accountHolderName: '',
      iban: '',
      bic: ''
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
          name="accountHolderName"
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
          name="iban"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('password.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="current-password" className={classNames?.input} placeholder={t('password.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('password.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="iban"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('password.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="current-password" className={classNames?.input} placeholder={t('password.placeholder')} {...field} />
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
