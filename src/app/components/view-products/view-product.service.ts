import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product";
import { User } from "src/app/models/user";
import { selectUser } from "src/app/store/auth/auth.selector";
import { loadProducts } from "src/app/store/product/product.actions";
import { selectProducts } from "src/app/store/product/product.selector";

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {
  constructor(private store: Store) {}

  loadProducts(): void {
    this.store.dispatch(loadProducts());
  }

  getProducts(): Observable<Product[]> {
    return this.store.select(selectProducts);
  }

  getCurrentUser(): Observable<User> {
    return this.store.select(selectUser);
  }
}
