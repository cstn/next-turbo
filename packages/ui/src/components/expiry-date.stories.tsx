import type { Meta, StoryObj } from "@storybook/react";
import { ExpiryDate } from "./expiry-date";

const meta = {
  title: "Components/ExpiryDate",
  component: ExpiryDate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ExpiryDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "MM/YY",
  },
};

