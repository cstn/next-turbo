'use client';

import { FC } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/v4';
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
import { Checkbox } from '@cstn/ui/components/checkbox';

type Props = PropsWithStyle & {
  termsUrl: string;
  onError?: (errors: FieldErrors) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => Promise<void> | void;
};

const FormSchema = BankAccountSchema.extend({
  acceptTerms: z.boolean().refine(val => val, {
    message: 'acceptTerms.required',
  }),
});

export const DirectDebitForm: FC<Props> = ({ className, classNames, termsUrl, onSubmit, onError }) => {
  const t = useFormTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accountHolderName: '',
      iban: '',
      bic: '',
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
          name="accountHolderName"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('accountHolder.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="billing name" className={classNames?.input} placeholder={t('accountHolder.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('accountHolder.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="iban"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('iban.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="off" className={classNames?.input} placeholder={t('iban.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('iban.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bic"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('bic.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="off" className={classNames?.input} placeholder={t('bic.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('bic.description')}</FormDescription>
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
                   {t.rich('directDebit.acceptTerms', {
                     terms: (chunks) => (
                       <a className="underline" href={termsUrl} rel="noreferrer" target="_blank">{chunks}</a>
                     )
                   })}
                  </span>
                </FormLabel>
              </FormControl>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage className="my-4">
            {t(form.formState.errors.root.message || 'form.failed')}
          </FormMessage>
        )}
        <Button disabled={form.formState.isSubmitting} type="submit">{t('directDebit.submit')}</Button>
      </form>
    </Form>
  );
};
