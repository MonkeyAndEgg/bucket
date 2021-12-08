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
  // round the result to 2 decimal places
  return Math.round(total * 100) / 100;
}
