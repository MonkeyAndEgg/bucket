import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { catchError, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";
import { errorHandler } from "src/app/components/common/error-handler";
import { Cart } from "src/app/models/cart";
import { Payment, PaymentRequestPayload } from "src/app/models/payment";
import { updateCart } from "../order/order.actions";
import { selectCurrentCart } from "../order/order.selector";
import { processPayment, processPaymentComplete } from "./payment.actions";
import { PaymentDataService } from "./payment.data.service";

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private store: Store,
              private snackBar: MatSnackBar,
              private paymentDataService: PaymentDataService) {}

  processPayment$ = createEffect(() => this.actions$.pipe(
    ofType(processPayment),
    mergeMap((payload: { paymentRequest: PaymentRequestPayload }) => this.paymentDataService.processPayment(payload.paymentRequest)
    .pipe(
      withLatestFrom(this.store.select(selectCurrentCart)),
      switchMap(([paymentRes, cart]: [{ payment: Payment }, Cart | undefined]) => {
        if (cart) {
          // navigate to after payment page
          this.router.navigate(['/payment-complete']);
          // clean the current cart for the user
          const updatedCart = {...cart};
          updatedCart.products = [];
          const actions = [];
          actions.push(processPaymentComplete({ payment: paymentRes.payment }));
          actions.push(updateCart({ cart: updatedCart }));
          return actions;
        }
        const errorResponse = new HttpErrorResponse({ error: { message: 'The cart data is undefined, the payment is failed' }});
        errorHandler(this.snackBar, errorResponse);
        return EMPTY;
      }),
      catchError((err) => {
        errorHandler(this.snackBar, err);
        return EMPTY;
      })
    ))
  ));
}
