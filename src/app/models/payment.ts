import { ProductRequestData } from "./product-request-data";

export interface Payment {
  _id: string;
  amount: number;
  products: ProductRequestData[];
  stripeId: string;
}

export interface PaymentRequestPayload {
  token: object;
  cartId: string;
}
