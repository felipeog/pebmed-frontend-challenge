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
      id: 0,
      storeId: "id",
      title: "Title",
      description: "Description",
      caption: "Caption",
      fullPrice: 100,
      discountAmmount: 10,
      discountPercentage: 0.1,
      periodLabel: "Period Label",
      period: "Period",
      discountCouponCode: null,
      order: 0,
      priority: 0,
      gateway: "Gateway",
      splittable: true,
      installments: 3,
      acceptsCoupon: true,
    },
    installmentsDescription: "Selecione o número de parcelas",
    isSelected: false,
  },
};
