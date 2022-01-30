import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart/cart";
import { CartProductData } from "src/app/models/cart/cart-product-data";
import { CartProductRequestData } from "src/app/models/cart/cart-product-request-data";
import { Payment } from "src/app/models/payment";
import { addToCart } from "src/app/store/order/order.actions";
import { selectCurrentCart } from "src/app/store/order/order.selector";
import { selectPayment } from "src/app/store/payment/payment.selector";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private store: Store) {}

  updateCart(productData: CartProductData, cart: Cart): void {
    let updatedProducts: CartProductData[];
    let productDataList: CartProductRequestData[];
    if (productData.quantity === 0) {
      updatedProducts = cart.products.filter(
        (productObj: CartProductData) => productObj.product._id !== productData.product._id
      );
    } else {
      updatedProducts = cart.products;
    }
    productDataList = updatedProducts.map((productObj: CartProductData) => {
      return {
        productId: productObj.product._id ? productObj.product._id : '',
        quantity: productObj.product._id === productData.product._id ? productData.quantity : productObj.quantity };
    });
    const cartPayload = {
      userId: cart.userId,
      productDataList
    } as CartRequest;
    this.store.dispatch(addToCart({ cart: cartPayload, cartId: cart._id }));
  }

  getUserCart(): Observable<Cart | undefined> {
    return this.store.select(selectCurrentCart);
  }

  getCompletedPayment(): Observable<Payment> {
    return this.store.select(selectPayment)
  }
}
