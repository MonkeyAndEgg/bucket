import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { Product } from "src/app/models/product";
import { User } from "src/app/models/user";
import { selectUser } from "src/app/store/auth/auth.selector";
import { addToCart } from "src/app/store/order/order.actions";
import { selectCurrentCart } from "src/app/store/order/order.selector";
import { deleteProduct } from "src/app/store/product/product.actions";

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  constructor(private store: Store) {}

  getCurrentUser(): Observable<User | undefined> {
    return this.store.select(selectUser);
  }

  getUserCart(): Observable<Cart | undefined> {
    return this.store.select(selectCurrentCart);
  }

  addToCart(productId: string, userId: string, cart?: Cart): void {
    let cartId: string | undefined;
    let cartPayload: CartRequest;
    let productDataList: { product: string, quantity: number }[];
    if (cart) {
      productDataList = cart.products.map((item: { product: Product, quantity: number }) => {
        // TODO impore this _id condition
        return { product: item.product._id ? item.product._id : '', quantity: item!.quantity };
      });
      // TODO improve logic here
      const existProduct = productDataList.find(item => item.product === productId);
      if (existProduct) {
        productDataList.forEach(item => {
          if (item.product === productId) {
            item.quantity += 1;
          }
        })
      } else {
        productDataList.push({
          product: productId,
          quantity: 1
        });
      }

      cartId = cart._id;
    } else {
      productDataList = [{
        product: productId,
        quantity: 1
      }];
    }

    cartPayload = {
      userId,
      productDataList
    };

    this.store.dispatch(addToCart({ cart: cartPayload, cartId }));
  }

  deleteProduct(id: string) {
    this.store.dispatch(deleteProduct({ id }));
  }
}
