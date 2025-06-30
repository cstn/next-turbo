"use client";

import { FC } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { Username } from "@cstn/validation/username";
import { Password } from "@cstn/validation/password";
import { useFormTranslations } from '@cstn/i18n/hooks/useFormTranslations';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@cstn/ui/components/form";
import { Button } from "@cstn/ui/components/button";
import { Input } from "@cstn/ui/components/input";
import { PropsWithStyle } from '@cstn/ui/props';

type Props = PropsWithStyle & {
  onError?: (errors: FieldErrors) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
};

const FormSchema = z.object({
  username: Username,
  password: Password,
});

export const LoginForm: FC<Props> = ({ className, classNames, onSubmit, onError}) => {
  const t = useFormTranslations();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form  {...form}>
      <form className={clsx("w-full max-w-sm", className, classNames?.root)} onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{t('username.label')}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input className={classNames?.input} placeholder={t('username.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('username.description')}</FormDescription>
              <FormMessage className={classNames?.message} />
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
                <Input className={classNames?.input} type="password" placeholder={t('password.placeholder')} {...field} />
              </FormControl>
              <FormDescription className={classNames?.description}>{t('password.description')}</FormDescription>
              <FormMessage className={classNames?.message} />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
