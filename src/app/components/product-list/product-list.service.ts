import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteProduct } from "src/app/store/product/product.actions";

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  constructor(private store: Store) {}

  deleteProduct(id: string) {
    this.store.dispatch(deleteProduct({ id }));
  }
}
