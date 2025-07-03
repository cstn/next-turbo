'use client';

import { FC } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/v4';
import clsx from 'clsx';
import { EmailSchema } from '@cstn/validation/email';
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
  email: EmailSchema,
});

export const RequestPasswordReset: FC<Props> = ({ className, classNames, onSubmit, onError }) => {
  const t = useFormTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
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
        {form.formState.errors.root && (
          <FormMessage className="my-4">
            {t(form.formState.errors.root.message || 'form.failed')}
          </FormMessage>
        )}
        <Button disabled={form.formState.isSubmitting} type="submit">{t('requestPasswordReset.submit')}</Button>
      </form>
    </Form>
  );
};
