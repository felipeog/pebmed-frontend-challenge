import type { Meta, StoryObj } from "@storybook/react";

import { Chip } from "components/Chip";

const meta = {
  title: "Component/Chip",
  component: Chip,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    children: "Chip",
    variation: "filled",
  },
};
