import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { Product } from "src/app/models/product";
import { createNewProduct, loadProducts, loadProductsComplete } from "./product.actions";
import { ProductDataService } from "./product.data.service";

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
              private productDataService: ProductDataService) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.productDataService.getProducts()
    .pipe(
      map((products: Product[]) => {
        return loadProductsComplete({ products });
      }),
      catchError(() => EMPTY)
    ))
  ));

  createNewProduct$ = createEffect(() => this.actions$.pipe(
    ofType(createNewProduct),
    mergeMap((payload: { product: FormData }) =>
      this.productDataService.createProduct(payload.product)
      .pipe(
        map((res: Product) => {
          return loadProducts();
        }),
        catchError(() => EMPTY)
      ))
  ));
}
