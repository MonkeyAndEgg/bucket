import { Action, createReducer, on } from "@ngrx/store";
import { Cart } from "src/app/models/cart";
import * as OrderActions from './order.actions';

export const orderFeatureKey = 'order';

export interface OrderState {
  currentCart: Cart;
}

export const initialState: OrderState = {
  currentCart: {} as Cart
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.updateCart, (state, data) => {
    return ({
      ...state,
      currentCart: data.cart
    });
  })
);

export function reducer(state: OrderState | undefined, action: Action) {
  return orderReducer(state, action);
}
