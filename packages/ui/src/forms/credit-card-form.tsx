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
import { CreditCardSchema } from '@cstn/validation/creditCard';
import { Checkbox } from '@cstn/ui/components/checkbox';
import { ExpiryDate } from '@cstn/ui/components/expiry-date';

type Props = PropsWithStyle & {
  termsUrl: string,
  onError?: (errors: FieldErrors) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => Promise<void> | void;
};

const FormSchema = CreditCardSchema;

export const CreditCardForm: FC<Props> = ({ className, classNames, termsUrl, onSubmit, onError }) => {
  const t = useFormTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardHolderName: '',
      number: '',
      csc: '',
      expirationDate: '',
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
          name="cardHolderName"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('cardHolder.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="billing cc-name" className={classNames?.input} placeholder={t('cardHolder.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('cardHolder.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('creditCardNumber.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="billing cc-number" className={classNames?.input} placeholder={t('creditCardNumber.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('creditCardNumber.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="csc"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('creditCardCSC.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input autoComplete="billing cc-csc" className={classNames?.input} placeholder={t('creditCardCSC.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('creditCardCSC.description')}</FormDescription>
              <FormMessage className={classNames?.message}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('creditCardExpiry.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <ExpiryDate autoComplete="billing cc-exp" className={classNames?.input} placeholder={t('creditCardExpiry.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('creditCardExpiry.description')}</FormDescription>
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
                   {t.rich('creditCard.acceptTerms', {
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
        <Button disabled={form.formState.isSubmitting} type="submit">{t('creditCard.submit')}</Button>
      </form>
    </Form>
  );
};
