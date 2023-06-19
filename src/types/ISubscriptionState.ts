import { IPlan } from "./IPlan";

export interface ISubscriptionState
  extends Pick<
    IPlan,
    "fullPrice" | "discountAmmount" | "splittable" | "title" | "description"
  > {
  installments: number | null | undefined;
  cpf: string;
}
