import { createAction, props } from "@ngrx/store";
import { Payment, PaymentRequestPayload } from "src/app/models/payment";

export const processPayment = createAction('[Payment] process payment', props<{ paymentRequest: PaymentRequestPayload }>());
export const processPaymentComplete = createAction('[Payment] process payment complete', props<{ payment: Payment }>());
