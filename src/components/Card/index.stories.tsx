import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "components/Card";

const meta = {
  title: "Component/Card",
  component: Card,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cards: Story = {
  args: {
    children: "Card",
    variation: "light",
    hasShadow: true,
  },
};
