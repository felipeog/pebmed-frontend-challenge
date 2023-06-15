import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./";

const meta = {
  title: "Text",
  component: Text,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Texts: Story = {
  args: {
    variation: "regular",
    children: "Text",
  },
};
