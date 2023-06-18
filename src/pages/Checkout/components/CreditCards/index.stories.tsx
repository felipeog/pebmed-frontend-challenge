import type { Meta, StoryObj } from "@storybook/react";

import { CreditCards } from "./";

const meta = {
  title: "Page/Checkout/CreditCards",
  component: CreditCards,
  tags: ["page"],
  argTypes: {},
} satisfies Meta<typeof CreditCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {},
};
