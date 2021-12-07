import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { Payment } from "src/app/models/payment";
import { Product } from "src/app/models/product";
import { addToCart } from "src/app/store/order/order.actions";
import { selectCurrentCart } from "src/app/store/order/order.selector";
import { processPayment } from "src/app/store/payment/payment.actions";
import { selectPayment } from "src/app/store/payment/payment.selector";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private store: Store) {}

  addToCart(productId: string, cart: Cart): void {
    const updatedProducts = cart.products.filter(
      (productData: { product: Product, quantity: number }) => productData.product._id !== productId
    );
    let productDataList: { product: string, quantity: number }[];
    if (updatedProducts.length > 0) {
      productDataList = updatedProducts.map((productData: { product: Product, quantity: number }) => {
        return { product: productData.product._id ? productData.product._id : '', quantity: productData.quantity };
      });
    } else {
      productDataList = [];
    }
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
