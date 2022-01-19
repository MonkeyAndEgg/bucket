import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromOrder from '../order/order.reducer';

export const selectUserState = createFeatureSelector<fromOrder.OrderState>(
  fromOrder.orderFeatureKey
);

export const selectCurrentCart = createSelector(
  selectUserState,
  (state: fromOrder.OrderState) => state.currentCart
);
