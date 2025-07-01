'use client';

import { FC } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';
import { Email } from '@cstn/validation/email';
import { ComplexPassword } from '@cstn/validation/password';
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
import { Checkbox } from '@cstn/ui/components/checkbox';
import { PropsWithStyle } from '@cstn/ui/props';

type Props = PropsWithStyle & {
  privacyUrl: string;
  termsUrl: string;
  onError?: (errors: FieldErrors) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => Promise<void>;
};

const FormSchema = z.object({
  email: Email,
  password: ComplexPassword,
  confirmPassword: ComplexPassword,
  acceptTerms: z.boolean().refine((val) => val, {
    message: 'acceptTerms.required',
  }),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: 'confirmPassword.match',
  path: [ 'confirmPassword' ],
});

export const RegisterForm: FC<Props> = ({ className, classNames, privacyUrl, termsUrl, onSubmit, onError }) => {
  const t = useFormTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
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
          name="email"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('email.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="email" className={classNames?.input}
                       placeholder={t('email.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('email.description')}</FormDescription>
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
                <Input autoComplete="new-password" className={classNames?.input} type="password"
                       placeholder={t('password.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('password.description')}</FormDescription>
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
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormControl className={classNames?.control}>
                <FormLabel className="flex items-center space-x-2" htmlFor="acceptTerms">
                  <Checkbox
                    id="acceptTerms"
                    className={clsx('h-4 w-4', classNames?.checkbox)}
                    checked={field.value}
                    onCheckedChange={(checked: boolean) => field.onChange(checked)}
                  />
                  <span className={classNames?.label}>
                    {t.rich('acceptTerms.label', {
                      terms: (chunks) => (
                        <a className="underline" href={termsUrl} rel="noreferrer" target="_blank">{chunks}</a>
                      ),
                      privacy: (chunks) => (
                        <a className="underline" href={privacyUrl} rel="noreferrer" target="_blank">{chunks}</a>
                      ),
                    })}
                  </span>
                </FormLabel>
              </FormControl>
              <FormDescription className={classNames?.description}>{t('acceptTerms.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage className="my-4">
            {t(form.formState.errors.root.message || 'form.failed')}
          </FormMessage>
        )}
        <Button disabled={form.formState.isSubmitting} type="submit">Submit</Button>
      </form>
    </Form>
  );
};
