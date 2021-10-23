import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";
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
}
