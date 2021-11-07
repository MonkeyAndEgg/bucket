import { Action, createReducer, on } from "@ngrx/store";
import { Payment } from "src/app/models/payment";
import * as PaymentActions from './payment.actions';

export const paymentFeatureKey = 'payment';

export interface PaymentState {
  payment: Payment;
}

export const initialState: PaymentState = {
  payment: {} as Payment
};

export const paymentReducer = createReducer(
  initialState,
  on(PaymentActions.processPaymentComplete, (state, data) => {
    return ({
      ...state,
      payment: data.payment
    });
  })
);

export function reducer(state: PaymentState | undefined, action: Action) {
  return paymentReducer(state, action);
}
