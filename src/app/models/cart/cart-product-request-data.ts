import { CartProduct } from "./cart-product";

export interface CartProductRequestData extends CartProduct {
  productId: string;
}
