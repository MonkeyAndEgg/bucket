import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { errorHandler } from "src/app/components/common/error-handler";
import { Cart, CartRequest } from "src/app/models/cart";
import { Order } from "src/app/models/order";
import { addToCart, loadCartById, loadOrdersByUserId, updateCart, updateOrders } from "./order.actions";
import { OrderDataService } from "./order.data.service";

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,
              private orderDataService: OrderDataService) {}

  loadCartById$ = createEffect(() => this.actions$.pipe(
    ofType(loadCartById),
    mergeMap((payload: { id: string }) => this.orderDataService.getCartById(payload.id)
    .pipe(
      map((cart: Cart) => {
        return updateCart({ cart });
      }),
      catchError((err) => {
        if (err.status === 404) {
          return of(updateCart({ cart: {} as Cart }));
        }
        errorHandler(this.snackBar, err);
        return EMPTY;
      })
    ))
  ));

  loadOrdersByUserId$ = createEffect(() => this.actions$.pipe(
    ofType(loadOrdersByUserId),
    mergeMap((payload: { userId: string }) => this.orderDataService.getOrdersByUserId(payload.userId)
    .pipe(
      map((orders: Order[]) => {
        return updateOrders({ orders });
      }),
      catchError((err) => {
        if (err.status === 404) {
          return of(updateOrders({ orders: [] }));
        }
        errorHandler(this.snackBar, err);
        return EMPTY;
      })
    ))
  ));

  addToCart$ = createEffect(() => this.actions$.pipe(
    ofType(addToCart),
    mergeMap((payload: { cart: CartRequest, cartId?: string | undefined }) =>
      this.orderDataService.addToCart(payload.cart, payload.cartId)
      .pipe(
        map((cart: Cart) => {
          return loadCartById({ id: cart.userId });
        }),
        catchError((err) => {
          errorHandler(this.snackBar, err);
          return EMPTY;
        })
      ))
  ));
}
