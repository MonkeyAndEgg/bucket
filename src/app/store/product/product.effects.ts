import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Product } from "src/app/models/product";
import { createNewProduct, deleteProduct, loadProductById, loadProductByIdComplete, loadProducts, loadProductsComplete } from "./product.actions";
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

  loadProductById$ = createEffect(() => this.actions$.pipe(
    ofType(loadProductById),
    mergeMap((payload) => this.productDataService.getProductById(payload.id)
    .pipe(
      map((product: Product) => {
        return loadProductByIdComplete({ product });
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

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    mergeMap((payload: { id: string }) => this.productDataService.deleteProduct(payload.id)
      .pipe(
        map((res: any) => {
          return loadProducts();
        }),
        catchError(() => EMPTY)
      ))
  ));
}
