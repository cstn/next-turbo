import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from './register-form';
import { expect, fn } from 'storybook/test';
import { action } from 'storybook/actions';

const meta = {
  title: 'Forms/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
  tags: [ 'autodocs' ],
  args: {
    privacyUrl: 'https://www.cast-it.de/privacy',
    termsUrl: 'https://demo.cast-it.de/en/terms',
    onError: fn(),
    classNames: {
      root: 'w-full max-w-sm',
      form: 'flex flex-col',
      field: 'my-4',
    },
  },
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async (values) => {
      action('onSubmit')(values);
      return Promise.resolve();
    },
  },
};

export const Required: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvas, userEvent, globals }) => {
    if (globals.locale !== 'en') {
      return;
    }

    const button = await canvas.findByRole('button', { name: 'Register' });
    await userEvent.click(button);
  },
};

export const Failed: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error('register.failed');
    },
  },
  play: async ({ canvas, userEvent, globals }) => {
    if (globals.locale !== 'en') {
      return;
    }

    const emailInput = canvas.getByLabelText('Email', {
      selector: 'input',
    });
    await userEvent.type(emailInput, 'duplicate@test.local');
    const passwordInput = canvas.getByLabelText('Password', {
      selector: 'input',
    });
    await userEvent.type(passwordInput, 'Pw$123456');
    const confirmPasswordInput = canvas.getByLabelText('Confirm Password', {
      selector: 'input',
    });
    await userEvent.type(confirmPasswordInput, 'Pw$123456');
    const acceptTermsCheckbox = canvas.getByRole('checkbox');
    await userEvent.click(acceptTermsCheckbox);

    const button = await canvas.findByRole('button', { name: 'Register' });
    await userEvent.click(button);

    const message = await canvas.findByText(/Registration failed/);
    await expect(message).toBeDefined();
  },
};

export const DuplicateEmail: Story = {
  args: {
    onSubmit: (values) => {
      action('onSubmit')(values);
      throw new Error('register.email');
    },
  },
  play: async ({ canvas, userEvent, globals }) => {
    if (globals.locale !== 'en') {
      return;
    }

    const emailInput = canvas.getByLabelText('Email', {
      selector: 'input',
    });
    await userEvent.type(emailInput, 'duplicate@test.local');
    const passwordInput = canvas.getByLabelText('Password', {
      selector: 'input',
    });
    await userEvent.type(passwordInput, 'Pw$123456');
    const confirmPasswordInput = canvas.getByLabelText('Confirm Password', {
      selector: 'input',
    });
    await userEvent.type(confirmPasswordInput, 'Pw$123456');
    const acceptTermsCheckbox = canvas.getByRole('checkbox');
    await userEvent.click(acceptTermsCheckbox);

    const button = await canvas.findByRole('button', { name: 'Register' });
    await userEvent.click(button);

    const message = await canvas.findByText(/Email address is already registered/);
    await expect(message).toBeDefined();
  },
};
