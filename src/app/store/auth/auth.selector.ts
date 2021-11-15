import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from '../auth/auth.reducer';

export const selectUserState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.userFeatureKey
);

export const selectUser = createSelector(
  selectUserState,
  (state: fromAuth.AuthState) => state.user
);
export const selectToken = createSelector(
  selectUserState,
  (state: fromAuth.AuthState) => state.token
);
export const selectExpiration = createSelector(
  selectUserState,
  (state: fromAuth.AuthState) => state.expiresIn
);
export const selectIsAuth = createSelector(
  selectUserState,
  (state: fromAuth.AuthState) => state.isAuth
);
export const selectLoadStatus = createSelector(
  selectUserState,
  (state: fromAuth.AuthState) => state.loadStatus
);
