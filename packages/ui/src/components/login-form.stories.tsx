import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./login-form";

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
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
