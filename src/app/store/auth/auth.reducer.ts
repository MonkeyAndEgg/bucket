import { Action, createReducer, on } from "@ngrx/store";
import { LoadStatus } from "src/app/constants/load-status.constants";
import { User } from "src/app/models/user";
import * as AuthActions from './auth.actions';

export const userFeatureKey = 'user';

export interface AuthState {
  user: User | undefined;
  token: string;
  expiresIn: number;
  loadStatus: LoadStatus;
}

export const initialState: AuthState = {
  user: undefined,
  token: '',
  expiresIn: 0,
  loadStatus: LoadStatus.NOT_LOADED
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setCurrentUser, (state, data) => {
    return ({
      ...state,
      user: data.user
    });
  }),
  on(AuthActions.updateToken, (state, data) => {
    return ({
      ...state,
      token: data.token,
      expiresIn: data.expiresIn
    });
  }),
  on(AuthActions.setLoadStatus, (state, data) => {
    return ({
      ...state,
      loadStatus: data.status
    });
  })
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
