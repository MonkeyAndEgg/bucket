import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { loadCartById, loadCartByIdComplete } from "./order.actions";
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
}
