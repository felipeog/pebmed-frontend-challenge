import type { Meta, StoryObj } from "@storybook/react";

import { NavigationHeader } from "router/NavigationHeader";

const meta = {
  title: "Router/NavigationHeader",
  component: NavigationHeader,
  tags: ["router"],
  argTypes: {},
} satisfies Meta<typeof NavigationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {},
};
