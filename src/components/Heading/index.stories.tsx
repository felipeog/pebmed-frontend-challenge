import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "./";

const meta = {
  title: "Heading",
  component: Heading,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  args: {
    tag: "h1",
    children: "Heading",
  },
};
