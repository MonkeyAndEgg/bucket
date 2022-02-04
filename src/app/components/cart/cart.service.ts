import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { Order } from "src/app/models/order";
import { Payment } from "src/app/models/payment";
import { ProductData } from "src/app/models/product-data";
import { ProductRequestData } from "src/app/models/product-request-data";
import { addToCart } from "src/app/store/order/order.actions";
import { selectCurrentCart, selectOrders } from "src/app/store/order/order.selector";
import { selectPayment } from "src/app/store/payment/payment.selector";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private store: Store) {}

  updateCart(productData: ProductData, cart: Cart): void {
    let updatedProducts: ProductData[];
    let productDataList: ProductRequestData[];
    if (productData.quantity === 0) {
      updatedProducts = cart.products.filter(
        (productObj: ProductData) => productObj.product._id !== productData.product._id
      );
    } else {
      updatedProducts = cart.products;
    }
    productDataList = updatedProducts.map((productObj: ProductData) => {
      return {
        productId: productObj.product._id ?
          productObj.product._id : '',
        quantity: productObj.product._id === productData.product._id ?
          productData.quantity : productObj.quantity
      };
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

  getUserOrders(): Observable<Order[]> {
    return this.store.select(selectOrders);
  }

  getCompletedPayment(): Observable<Payment> {
    return this.store.select(selectPayment)
  }
}
