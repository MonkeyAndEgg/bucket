import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Payment, PaymentRequestPayload } from "src/app/models/payment";
import { processPayment, processPaymentComplete } from "./payment.actions";
import { PaymentDataService } from "./payment.data.service";

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private paymentDataService: PaymentDataService) {}

  processPayment$ = createEffect(() => this.actions$.pipe(
    ofType(processPayment),
    mergeMap((payload: { paymentRequest: PaymentRequestPayload }) => this.paymentDataService.processPayment(payload.paymentRequest)
    .pipe(
      map((paymentRes: { payment: Payment }) => {
        this.router.navigate(['/payment-complete']);
        return processPaymentComplete({ payment: paymentRes.payment });
      }),
      catchError(() => EMPTY)
    ))
  ));
}
