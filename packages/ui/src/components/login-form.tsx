"use client";

import { FC } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { Username } from "@cstn/validation/username";
import { Password } from "@cstn/validation/password";
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
  username: {
    label?: string;
    placeholder?: string;
    description?: string;
  };
  password: {
    label?: string;
    placeholder?: string;
    description?: string;
  };
  onError?: (errors: FieldErrors) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
};

const FormSchema = z.object({
  username: Username,
  password: Password,
});

export const LoginForm: FC<Props> = ({ className, classNames, username, password, onSubmit, onError}) => {
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
              <FormLabel className={classNames?.label}>{username.label}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input className={classNames?.input} placeholder={username.placeholder} {...field} />
              </FormControl>
              {username.description && <FormDescription className={classNames?.description}>{username.description}</FormDescription>}
              <FormMessage className={classNames?.message} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className={classNames?.field}>
              <FormLabel className={classNames?.label}>{password.label}</FormLabel>
              <FormControl className={classNames?.control}>
                <Input className={classNames?.input} type="password" placeholder={password.placeholder} {...field} />
              </FormControl>
              {password.description && <FormDescription className={classNames?.description}>{password.description}</FormDescription>}
              <FormMessage className={classNames?.message} />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
