import { Product } from "src/app/models/product";

export function calculateProductTotal(products: { product: Product, quantity: number }[]): number {
  let total = 0;
  if (products && products.length > 0) {
    for (const item of products) {
      if (item?.product?.price && item?.quantity) {
        total += item.product.price * item.quantity;
      }
    }
  }
  return total;
}