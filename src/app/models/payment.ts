import { CartProductRequestData } from "./cart/cart-product-request-data";

export interface Payment {
  _id: string;
  amount: number;
  products: CartProductRequestData[];
  stripeId: string;
}

export interface PaymentRequestPayload {
  token: object;
  cartId: string;
}
