import { CartProductData } from "src/app/models/cart/cart-product-data";
import { RoundToTwoDecimals } from "src/app/components/common/common-price-utils";
import { ProductStatus } from "src/app/constants/product-status.constants";

export function calculateProductTotal(products: CartProductData[]): number {
  let total = 0;
  if (products && products.length > 0) {
    for (const item of products) {
      if (item?.product?.price && item?.quantity && item?.status === ProductStatus.WAIT_TO_BUY) {
        total += item.product.price * item.quantity;
      }
    }
  }
  // round the result to 2 decimal places
  return RoundToTwoDecimals(total);
}
