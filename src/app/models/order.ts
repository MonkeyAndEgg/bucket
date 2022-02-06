import { AddressData } from "./address-data";
import { Cart } from "./cart";

export interface Order extends Cart {
  status: string;
  createdAt: string;
  address: { shipping: AddressData, billing: AddressData };
  total: number;
  trackingNum?: string;
}
