import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "components/Select";

const meta = {
  title: "Component/Select",
  component: Select,
  tags: ["component"],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    disabled: false,
    label: "Label",
    id: "ID",
    placeholder: "Selecionar",
    required: true,
    isDefaultValue: false,
    options: [
      {
        label: "Label 1",
        value: "Value 1",
      },
      {
        label: "Label 2",
        value: "Value 2",
      },
    ],
  },
};
