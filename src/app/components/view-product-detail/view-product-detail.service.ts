import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { Product } from "src/app/models/product";
import { addToCart } from "src/app/store/order/order.actions";
import { selectCurrentCart } from "src/app/store/order/order.selector";
import { loadProductById } from "src/app/store/product/product.actions";
import { selectProductInView } from "src/app/store/product/product.selector";

@Injectable({
  providedIn: 'root'
})
export class ViewProductDetailService {
  constructor(private store: Store) {}

  loadProductById(id: string): void {
    this.store.dispatch(loadProductById({ id }));
  }

  getSelectedProduct(): Observable<Product | undefined> {
    return this.store.select(selectProductInView);
  }

  getUserCart(): Observable<Cart | undefined> {
    return this.store.select(selectCurrentCart);
  }

  addToCart(productId: string, quantity: number, cart: Cart): void {
    let cartPayload: CartRequest;
    let productDataList: { product: string, quantity: number }[];
    productDataList = cart.products.map((item: { product: Product, quantity: number }) => {
      return { product: item.product._id ? item.product._id : '', quantity: item!.quantity };
    });
    const existProduct = productDataList.find(item => item.product === productId);
    if (existProduct) {
      productDataList.forEach(item => {
        if (item.product === productId) {
          item.quantity += quantity;
        }
      })
    } else {
      productDataList.push({
        product: productId,
        quantity: quantity
      });
    }

    cartPayload = {
      userId: cart.userId,
      productDataList
    };
    this.store.dispatch(addToCart({ cart: cartPayload, cartId: cart._id }));
  }
}
