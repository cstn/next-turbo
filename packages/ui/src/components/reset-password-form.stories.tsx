import type { Meta, StoryObj } from "@storybook/react";
import { ResetPasswordForm } from "./reset-password-form";
import { fn } from 'storybook/test';
import { action } from 'storybook/actions';

const meta = {
  title: "Forms/ResetPasswordForm",
  component: ResetPasswordForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onError: fn(),
    classNames: {
      root: "w-full max-w-sm",
      form: "flex flex-col",
      field: "my-4"
    },
    token: 'secret-password-reset-token',
  },
} satisfies Meta<typeof ResetPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async (values) => {
      action('onSubmit')(values);
      return Promise.resolve();
    }
  }
};

export const Failed: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error("resetPassword.failed");
    }
  }
}

