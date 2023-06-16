import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "components/Input";

const meta = {
  title: "Component/Input",
  component: Input,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inputs: Story = {
  args: {
    isValid: true,
    disabled: false,
    placeholder: "Input",
    label: "Label",
    id: "ID",
  },
};
