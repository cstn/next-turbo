import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./login-form";
import { expect, fn } from 'storybook/test';
import { action } from 'storybook/actions';

const meta = {
  title: "Forms/LoginForm",
  component: LoginForm,
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
} satisfies Meta<typeof LoginForm>;

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
  play: async ({ canvas, userEvent, globals }) => {
    if (globals.locale !== 'en') {
      return;
    }

    const button = await canvas.findByRole("button", { name: "Log In" });
    await userEvent.click(button);
  },
};

export const Failed: Story = {
  args: {
    defaultValues: {
      username: 'demo',
    },
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error("login.invalid");
    }
  },
  play: async ({ canvas, userEvent, globals }) => {
    if (globals.locale !== 'en') {
      return;
    }

    const usernameInput = canvas.getByLabelText('Username', {
      selector: 'input',
    });
    await userEvent.type(usernameInput, 'user@test.local');
    const passwordInput = canvas.getByLabelText('Password', {
      selector: 'input',
    });
    await userEvent.type(passwordInput, 'Pw$123456');

    const button = await canvas.findByRole("button", { name: "Log In" });
    await userEvent.click(button);

    const message = await canvas.findByText(/Please check your username and password/);
    await expect(message).toBeDefined()
  },
}
