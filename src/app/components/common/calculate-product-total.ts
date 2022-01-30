import { CartProductData } from "src/app/models/cart/cart-product-data";
import { RoundToTwoDecimals } from "src/app/components/common/common-price-utils";

export function calculateProductTotal(products: CartProductData[]): number {
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
