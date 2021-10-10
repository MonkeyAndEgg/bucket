import { Action, createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user";
import * as AuthActions from './auth.actions';

export const userFeatureKey = 'user';

export interface AuthState {
  user: User
}

export const initialState: AuthState = {
  user: {
    id: '',
    email: ''
  }
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loadCurrentUserComplete, (state, data) => {
    const user = data.user ? { id: data.user.id, email: data.user.email } : { id: '', email: '' };
    return ({
      ...state, user
    });
  })
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
