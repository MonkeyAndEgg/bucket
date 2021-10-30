import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { CartRequest } from "src/app/models/cart";
import { addToCart, loadCartById, loadCartByIdComplete } from "./order.actions";
import { OrderDataService } from "./order.data.service";

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions,
              private orderDataService: OrderDataService) {}

  loadCartById$ = createEffect(() => this.actions$.pipe(
    ofType(loadCartById),
    mergeMap((payload: { id: string }) => this.orderDataService.getCartById(payload.id)
    .pipe(
      map((cart: any) => {
        return loadCartByIdComplete({ cart });
      }),
      catchError(() => EMPTY)
    ))
  ));

  addToCart$ = createEffect(() => this.actions$.pipe(
    ofType(addToCart),
    mergeMap((payload: { cart: CartRequest, cartId?: string | undefined }) =>
      this.orderDataService.addToCart(payload.cart, payload.cartId)
      .pipe(
        map((cart: any) => {
          return loadCartById({ id: cart.userId });
        }),
        catchError(() => EMPTY)
      ))
  ));
}
