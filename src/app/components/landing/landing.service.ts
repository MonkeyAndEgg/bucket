import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";
import { loadProducts } from "src/app/store/product/product.actions";
import { selectProducts } from "src/app/store/product/product.selector";

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  SORT_DATE_DSC = 'createdAt:dsc';

  constructor(private store: Store) {}

  loadProducts(): void {
    this.store.dispatch(loadProducts({ sort: this.SORT_DATE_DSC }));
  }

  getProducts(): Observable<Product[]> {
    return this.store.select(selectProducts);
  }
}
