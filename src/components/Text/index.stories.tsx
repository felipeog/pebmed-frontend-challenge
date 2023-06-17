import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "components/Text";

const meta = {
  title: "Component/Text",
  component: Text,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    variation: "regular",
    children: "Text",
  },
};
