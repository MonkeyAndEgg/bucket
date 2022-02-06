import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { ProductData } from "src/app/models/product-data";
import { ProductRequestData } from "src/app/models/product-request-data";
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
    let productDataList: ProductRequestData[];
    if (cart) {
      productDataList = cart.products.map((item: ProductData) => {
        return {
          productId: item.product._id ? item.product._id : '',
          quantity: item.quantity
        };
      });
      const existProductIndex = productDataList.findIndex(item =>
        item.productId === productId
      );
      if (existProductIndex > -1) {
        productDataList[existProductIndex].quantity += 1;
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
