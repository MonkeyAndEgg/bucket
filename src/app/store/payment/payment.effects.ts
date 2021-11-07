import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Payment, PaymentRequestPayload } from "src/app/models/payment";
import { processPayment, processPaymentComplete } from "./payment.actions";
import { PaymentDataService } from "./payment.data.service";

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions,
              private paymentDataService: PaymentDataService) {}

  processPayment$ = createEffect(() => this.actions$.pipe(
    ofType(processPayment),
    mergeMap((payload: { payment: PaymentRequestPayload }) => this.paymentDataService.processPayment(payload.payment)
    .pipe(
      map((payment: Payment) => {
        return processPaymentComplete({ payment });
      }),
      catchError(() => EMPTY)
    ))
  ));
}
