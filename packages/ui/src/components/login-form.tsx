"use client";

import { FC } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

type Props = {
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
};

const FormSchema = z.object({
  username: Username,
  password: Password,
});

export const LoginForm: FC<Props> = ({ username, password }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("Form submitted with values:", values);
  };

  const handleError = (errors: FieldErrors) => {
    console.error(errors);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, handleError)} className="w-full max-w-sm">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{username.label}</FormLabel>
              <FormControl>
                <Input placeholder={username.placeholder} {...field} />
              </FormControl>
              {username.description && <FormDescription>{username.description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{password.label}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={password.placeholder} {...field} />
              </FormControl>
              {password.description && <FormDescription>{password.description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
