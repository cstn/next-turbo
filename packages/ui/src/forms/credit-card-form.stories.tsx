import type { Meta, StoryObj } from "@storybook/react";
import { CreditCardForm } from "./credit-card-form";
import { fn } from 'storybook/test';
import { action } from 'storybook/actions';

const meta = {
  title: "Forms/CreditCardForm",
  component: CreditCardForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    termsUrl: "https://demo.cast-it.de/en/terms",
    onError: fn(),
    classNames: {
      root: "w-full max-w-sm",
      form: "flex flex-col",
      field: "my-4"
    }
  },
} satisfies Meta<typeof CreditCardForm>;

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

export const Failed: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error("creditCard.failed");
    }
  }
}
