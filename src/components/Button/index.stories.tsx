import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./";

const meta = {
  title: "Component/Button",
  component: Button,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  args: {
    children: "Button",
    variation: "primary",
    disabled: false,
  },
};
