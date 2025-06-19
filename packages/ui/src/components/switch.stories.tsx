import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { Label } from "./label";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};
