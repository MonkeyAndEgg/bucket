export interface Payment {
  _id: string;
  amount: number;
  products: { product: string, quantity: number }[];
  stripeId: string;
}

export interface PaymentRequestPayload {
  token: object;
  cartId: string;
}
