import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "components/Icon";

const meta = {
  title: "Component/Icon",
  component: Icon,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    name: "ArrowLeft",
    width: 32,
    height: 32,
    fill: "tomato",
  },
};
