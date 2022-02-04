import { ProductData } from "./product-data";
import { ProductRequestData } from "./product-request-data";

export interface Cart {
  _id: string;
  userId: string;
  products: ProductData[];
}

export interface CartRequest {
  userId: string;
  productDataList: ProductRequestData[];
}
