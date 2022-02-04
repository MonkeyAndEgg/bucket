import { Product } from "./product";

export interface ProductData {
  product: Product;
  quantity: number;
  totalPrice?: number;
}
