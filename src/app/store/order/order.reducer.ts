import { Action, createReducer, on } from "@ngrx/store";
import { Cart } from "src/app/models/cart";
import { Order } from "src/app/models/order";
import * as OrderActions from './order.actions';

export const orderFeatureKey = 'order';

export interface OrderState {
  currentCart: Cart | undefined;
  orders: Order[];
}

export const initialState: OrderState = {
  currentCart: undefined,
  orders: []
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.updateCart, (state, data) => {
    return ({
      ...state,
      currentCart: data.cart
    });
  }),
  on(OrderActions.updateOrders, (state, data) => {
    return ({
      ...state,
      orders: data.orders
    });
  })
);

export function reducer(state: OrderState | undefined, action: Action) {
  return orderReducer(state, action);
}
