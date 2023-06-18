import type { Meta, StoryObj } from "@storybook/react";

import { PlanOption } from "./";

const meta = {
  title: "Page/Checkout/PlanOption",
  component: PlanOption,
  tags: ["page"],
  argTypes: {},
} satisfies Meta<typeof PlanOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    plan: {
      title: "Title",
      description: "Description",
      fullPrice: 100,
      discountAmmount: 10,
      discountPercentage: 0.1,
      splittable: true,
    },
    installmentsDescription: "Selecione o número de parcelas",
    isSelected: false,
  },
};
