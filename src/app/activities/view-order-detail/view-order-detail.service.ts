import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Order } from "src/app/models/order";
import { loadOrderById } from "src/app/store/order/order.actions";
import { selectOrderInView } from "src/app/store/order/order.selector";

@Injectable({
  providedIn: 'root'
})
export class ViewOrderDetailService {
  constructor(private store: Store) {}

  getSelectedOrder(): Observable<Order | undefined> {
    return this.store.select(selectOrderInView);
  }

  loadOrderById(id: string): void {
    this.store.dispatch(loadOrderById({ id }));
  }
}
