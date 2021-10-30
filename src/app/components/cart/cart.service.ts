import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart";
import { loadCartById } from "src/app/store/order/order.actions";
import { selectCurrentCart } from "src/app/store/order/order.selector";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private store: Store) {}

  loadUserCart(id: string): void {
    this.store.dispatch(loadCartById({ id }));
  }

  getUserCart(): Observable<Cart> {
    return this.store.select(selectCurrentCart);
  }
}
