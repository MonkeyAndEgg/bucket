import { Product } from "../product";
import { CartProduct } from "./cart-product";

export interface CartProductData extends CartProduct {
  product: Product;
  totalPrice?: number;
}
