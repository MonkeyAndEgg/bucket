import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";
import { loadProducts } from "src/app/store/product/product.actions";
import { selectProducts } from "src/app/store/product/product.selector";

@Injectable({
  providedIn: 'root'
})
export class ViewSearchService {
  constructor(private store: Store) {}

  loadProducts(keyword: string): void {
    this.store.dispatch(loadProducts({ keyword }));
  }

  getProducts(): Observable<Product[]> {
    return this.store.select(selectProducts);
  }
}
