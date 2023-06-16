export interface ISubscription {
  couponCode: string | number | null;
  creditCardCPF: string;
  creditCardCVV: string;
  creditCardExpirationDate: string;
  creditCardHolder: string;
  creditCardNumber: string;
  gateway: string;
  id: number;
  installments: number;
  offerId: number;
  userId: number;
}
