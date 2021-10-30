import { Product } from "./product";

export interface Cart {
  _id: string;
  userId: string;
  products: { product: Product, quantity: number }[];
}

export interface CartRequest {
  userId: string;
  productDataList: { product: string, quantity: number }[];
}
