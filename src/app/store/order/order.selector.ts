import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromOrder from '../order/order.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.OrderState>(
  fromOrder.orderFeatureKey
);

export const selectCurrentCart = createSelector(
  selectOrderState,
  (state: fromOrder.OrderState) => state.currentCart
);

export const selectOrders = createSelector(
  selectOrderState,
  (state: fromOrder.OrderState) => state.orders
);

export const selectOrderInView = createSelector(
  selectOrderState,
  (state: fromOrder.OrderState) => state.orderInView
);
