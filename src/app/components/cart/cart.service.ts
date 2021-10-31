import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { Product } from "src/app/models/product";
import { addToCart, loadCartById } from "src/app/store/order/order.actions";
import { selectCurrentCart } from "src/app/store/order/order.selector";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private store: Store) {}

  loadUserCart(id: string): void {
    this.store.dispatch(loadCartById({ id }));
  }

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

  getUserCart(): Observable<Cart> {
    return this.store.select(selectCurrentCart);
  }
}
