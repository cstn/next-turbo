import type { Meta, StoryObj } from "@storybook/react";
import { RequestPasswordReset } from "./request-password-reset-form";
import { fn } from 'storybook/test';
import { action } from 'storybook/actions';

const meta = {
  title: "Forms/RequestPasswordReset",
  component: RequestPasswordReset,
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
} satisfies Meta<typeof RequestPasswordReset>;

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

export const Required: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const button = await canvas.findByRole("button");
    await userEvent.click(button);
  },
};
