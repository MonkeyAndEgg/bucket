import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { errorHandler } from "src/app/components/common/error-handler";
import { Product } from "src/app/models/product";
import { createNewProduct, deleteProduct, loadProductById, loadProductByIdComplete, loadProducts, loadProductsComplete } from "./product.actions";
import { ProductDataService } from "./product.data.service";

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,
              private productDataService: ProductDataService) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap((payload) => this.productDataService.getProducts(payload.filter, payload.sort)
    .pipe(
      map((products: Product[]) => {
        return loadProductsComplete({ products });
      }),
      catchError((err) => {
        errorHandler(this.snackBar, err);
        return EMPTY;
      })
    ))
  ));

  loadProductById$ = createEffect(() => this.actions$.pipe(
    ofType(loadProductById),
    mergeMap((payload) => this.productDataService.getProductById(payload.id)
    .pipe(
      map((product: Product) => {
        return loadProductByIdComplete({ product });
      }),
      catchError((err) => {
        errorHandler(this.snackBar, err);
        return EMPTY;
      })
    ))
  ));

  createNewProduct$ = createEffect(() => this.actions$.pipe(
    ofType(createNewProduct),
    mergeMap((payload: { product: FormData }) =>
      this.productDataService.createProduct(payload.product)
      .pipe(
        map((res: Product) => {
          return loadProducts({});
        }),
        catchError((err) => {
          errorHandler(this.snackBar, err);
          return EMPTY;
        })
      ))
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    mergeMap((payload: { id: string }) => this.productDataService.deleteProduct(payload.id)
      .pipe(
        map((res: { message: string }) => {
          return loadProducts({});
        }),
        catchError((err) => {
          errorHandler(this.snackBar, err);
          return EMPTY;
        })
      ))
  ));
}
