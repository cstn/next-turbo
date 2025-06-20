import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./login-form";
import { fn } from 'storybook/test';

const meta = {
  title: "Forms/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    username: {
      label: "Username",
      placeholder: "Enter your username",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
    onError: fn(),
    onSubmit: fn(),
    classNames: {
      root: "w-full max-w-sm",
      form: "flex flex-col",
      field: "my-4"
    }
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
