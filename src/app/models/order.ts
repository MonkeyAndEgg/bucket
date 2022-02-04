import { Cart } from "./cart";

export interface Order extends Cart {
  status: string;
  trackingNum?: string;
}
