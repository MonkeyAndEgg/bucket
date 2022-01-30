import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart/cart";
import { CartProductData } from "src/app/models/cart/cart-product-data";
import { CartProductRequestData } from "src/app/models/cart/cart-product-request-data";
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
    let productDataList: CartProductRequestData[];
    if (cart) {
      productDataList = cart.products.map((item: CartProductData) => {
        // TODO improre this _id condition
        return { productId: item.product._id ? item.product._id : '', quantity: item!.quantity };
      });
      // TODO improve logic here
      const existProduct = productDataList.find(item => item.productId === productId);
      if (existProduct) {
        productDataList.forEach(item => {
          if (item.productId === productId) {
            item.quantity += 1;
          }
        })
      } else {
        productDataList.push({
          productId,
          quantity: 1
        });
      }

      cartId = cart._id;
    } else {
      productDataList = [{
        productId,
        quantity: 1
      }];
    }

    cartPayload = {
      userId,
      productDataList
    };

    this.store.dispatch(addToCart({ cart: cartPayload, cartId }));
  }

  deleteProduct(id: string): void {
    this.store.dispatch(deleteProduct({ id }));
  }
}
