import type { Meta, StoryObj } from "@storybook/react";

import { HomeHeader } from "./";

const meta = {
  title: "Component/HomeHeader",
  component: HomeHeader,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof HomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeHeaders: Story = {
  args: {},
};
