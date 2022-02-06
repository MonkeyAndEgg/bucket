import { RoundToTwoDecimals } from "src/app/common/common-price-utils";
import { ProductData } from "src/app/models/product-data";

export function calculateProductTotal(products: ProductData[]): number {
  let total = 0;
  if (products && products.length > 0) {
    for (const item of products) {
      if (item?.product?.price && item?.quantity) {
        total += item.product.price * item.quantity;
      }
    }
  }
  // round the result to 2 decimal places
  return RoundToTwoDecimals(total);
}
