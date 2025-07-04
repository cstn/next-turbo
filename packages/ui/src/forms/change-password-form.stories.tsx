import type { Meta, StoryObj } from "@storybook/react";
import { ChangePasswordForm } from "./change-password-form";
import { expect, fn } from 'storybook/test';
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

export const Required: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvas, userEvent, globals }) => {
    if (globals.locale !== 'en') {
      return;
    }

    const button = await canvas.findByRole('button', { name: 'Change Password' });
    await userEvent.click(button);
  },
};

export const Mismatch: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error("changePassword.currentMismatch");
    }
  },
  play: async ({ canvas, userEvent, globals }) => {
    if (globals.locale !== 'en') {
      return;
    }

    const passwordInput = canvas.getByLabelText('Current Password', {
      selector: 'input',
    });
    await userEvent.type(passwordInput, 'Pw$123456');
    const newPasswordInput = canvas.getByLabelText('New Password', {
      selector: 'input',
    });
    await userEvent.type(newPasswordInput, 'Pw$123456');
    const confirmPasswordInput = canvas.getByLabelText('Confirm Password', {
      selector: 'input',
    });
    await userEvent.type(confirmPasswordInput, 'Pw$234567');

    const button = await canvas.findByRole("button", { name: "Change Password" });
    await userEvent.click(button);

    const message = await canvas.findByText(/Passwords do not match/);
    await expect(message).toBeDefined()
  },
}

export const Failed: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error("changePassword.failed");
    }
  }
}

