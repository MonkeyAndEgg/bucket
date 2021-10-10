import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from '../auth/auth.reducer';

export const selectUserState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.userFeatureKey
);

export const selectUser = createSelector(
  selectUserState,
  (state: fromAuth.AuthState) => state.user
);
