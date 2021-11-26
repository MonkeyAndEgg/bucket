export interface Product {
  name: string;
  price: number;
  description: string;
  numOfStocks: number;
  type: string;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string;
  _id?: string
}
