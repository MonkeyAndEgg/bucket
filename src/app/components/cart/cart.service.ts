import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectCurrentCart } from "src/app/store/order/order.selector";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient, private store: Store) {}

  getUserCart(): Observable<any> {
    return this.store.select(selectCurrentCart);
  }
}
