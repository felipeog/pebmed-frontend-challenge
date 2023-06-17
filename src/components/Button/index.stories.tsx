import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "components/Button";

const meta = {
  title: "Component/Button",
  component: Button,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    children: "Button",
    variation: "primary",
    disabled: false,
  },
};
