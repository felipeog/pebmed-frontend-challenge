export interface IPlan {
  acceptsCoupon: boolean;
  caption: string;
  description: string;
  discountAmmount: number;
  discountCouponCode: string | number | null;
  discountPercentage: number;
  fullPrice: number;
  gateway: string;
  id: number;
  installments: number;
  order: number;
  period: string;
  periodLabel: string;
  priority: number;
  splittable: boolean;
  storeId: string;
  title: string;
}
