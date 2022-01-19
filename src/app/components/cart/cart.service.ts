import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { Payment } from "src/app/models/payment";
import { Product } from "src/app/models/product";
import { addToCart } from "src/app/store/order/order.actions";
import { selectCurrentCart } from "src/app/store/order/order.selector";
import { selectPayment } from "src/app/store/payment/payment.selector";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private store: Store) {}

  updateCart(productData: { product: Product, quantity: number }, cart: Cart): void {
    let updatedProducts: { product: Product, quantity: number }[];
    let productDataList: { product: string, quantity: number }[];
    if (productData.quantity === 0) {
      updatedProducts = cart.products.filter(
        (productObj: { product: Product, quantity: number }) => productObj.product._id !== productData.product._id
      );
    } else {
      updatedProducts = cart.products;
    }
    productDataList = updatedProducts.map((productObj: { product: Product, quantity: number }) => {
      return {
        product: productObj.product._id ? productObj.product._id : '',
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
