import type { Meta, StoryObj } from "@storybook/react";

import { NavigationHeader } from "./";

const meta = {
  title: "Component/NavigationHeader",
  component: NavigationHeader,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof NavigationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationHeaders: Story = {
  args: {},
};
