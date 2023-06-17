import type { Meta, StoryObj } from "@storybook/react";

import { HomeHeader } from "./";

const meta = {
  title: "Router/HomeHeader",
  component: HomeHeader,
  tags: ["router"],
  argTypes: {},
} satisfies Meta<typeof HomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {},
};
