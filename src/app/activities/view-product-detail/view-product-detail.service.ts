import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart, CartRequest } from "src/app/models/cart";
import { Product } from "src/app/models/product";
import { ProductData } from "src/app/models/product-data";
import { ProductRequestData } from "src/app/models/product-request-data";
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
    let productDataList: ProductRequestData[];
    productDataList = cart.products.map((item: ProductData) => {
      return { productId: item.product._id ? item.product._id : '', quantity: item!.quantity };
    });
    const existProduct = productDataList.find(item => item.productId === productId);
    if (existProduct) {
      productDataList.forEach(item => {
        if (item.productId === productId) {
          item.quantity += quantity;
        }
      })
    } else {
      productDataList.push({
        productId,
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
