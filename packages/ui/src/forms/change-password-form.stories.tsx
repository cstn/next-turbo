import type { Meta, StoryObj } from "@storybook/react";
import { ChangePasswordForm } from "./change-password-form";
import { fn } from 'storybook/test';
import { action } from 'storybook/actions';

const meta = {
  title: "Forms/ChangePasswordForm",
  component: ChangePasswordForm,
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
    }
  },
} satisfies Meta<typeof ChangePasswordForm>;

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

export const Invalid: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error("changePassword.currentMismatch");
    }
  }
}

export const Failed: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error("changePassword.failed");
    }
  }
}

