import { Action, createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user";
import * as AuthActions from './auth.actions';

export const userFeatureKey = 'user';

export interface AuthState {
  user: User;
  token: string;
  isAuth: boolean;
  expiresIn: number;
}

export const initialState: AuthState = {
  user: {
    id: '',
    email: '',
    isAdmin: false
  },
  token: '',
  isAuth: false,
  expiresIn: 0
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loadCurrentUserComplete, (state, data) => {
    const user = data.user ? { id: data.user.id, email: data.user.email, isAdmin: data.user.isAdmin } : { id: '', email: '', isAdmin: false };
    return ({
      ...state,
      user
    });
  }),
  on(AuthActions.updateToken, (state, data) => {
    return ({
      ...state,
      token: data.token,
      expiresIn: data.expiresIn
    });
  }),
  on(AuthActions.updateAuthStatus, (state, data) => {
    return ({
      ...state,
      isAuth: data.isAuth
    });
  })
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
