import type { Meta, StoryObj } from "@storybook/react";
import { RegisterForm } from "./register-form";
import { fn } from 'storybook/test';
import { action } from 'storybook/actions';

const meta = {
  title: "Forms/RegisterForm",
  component: RegisterForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    privacyUrl: "https://www.cast-it.de/privacy",
    termsUrl: "https://demo.cast-it.de/en/terms",
    onError: fn(),
    classNames: {
      root: "w-full max-w-sm",
      form: "flex flex-col",
      field: "my-4"
    }
  },
} satisfies Meta<typeof RegisterForm>;

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
      throw new Error("register.failed");
    }
  }
}

export const DuplicateEmail: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error("register.email");
    }
  }
}
