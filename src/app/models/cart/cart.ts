import { CartProductData } from "./cart-product-data";
import { CartProductRequestData } from "./cart-product-request-data";

export interface Cart {
  _id: string;
  userId: string;
  products: CartProductData[];
}

export interface CartRequest {
  userId: string;
  productDataList: CartProductRequestData[];
}
