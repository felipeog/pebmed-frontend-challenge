import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "components/Heading";

const meta = {
  title: "Component/Heading",
  component: Heading,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    tag: "h1",
    children: "Heading",
  },
};
