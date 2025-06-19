import type { Meta, StoryObj } from "@storybook/react";
import ModeToggle from "./mode-toggle";

const meta: Meta<typeof ModeToggle> = {
  title: "Components/ModeToggle",
  component: ModeToggle,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ModeToggle>;

export const Default: Story = {
  parameters: {
    theme: "light",
  },
};
