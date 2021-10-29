import { Action, createReducer, on } from "@ngrx/store";
import * as OrderActions from './order.actions';

export const orderFeatureKey = 'order';

export interface OrderState {
  currentCart: any;
}

export const initialState: OrderState = {
  currentCart: {}
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadCartByIdComplete, (state, data) => {
    return ({
      ...state,
      currentCart: data.cart
    });
  })
);

export function reducer(state: OrderState | undefined, action: Action) {
  return orderReducer(state, action);
}
