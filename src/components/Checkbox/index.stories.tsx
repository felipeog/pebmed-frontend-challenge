import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "components/Checkbox";

const meta = {
  title: "Component/Checkbox",
  component: Checkbox,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkboxs: Story = {
  args: {
    isOn: false,
    isDisabled: false,
  },
};
