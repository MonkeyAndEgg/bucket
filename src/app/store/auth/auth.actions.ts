import { createAction, props } from "@ngrx/store";
import { LoginInfo } from "src/app/models/login-info";
import { User } from "src/app/models/user";

export const loadCurrentUser = createAction('[Auth] load current user info');
export const loadCurrentUserComplete = createAction('[Auth] load current user info complete', props<{ user: User }>());
export const updateToken = createAction('[Auth] update user token', props<{ token: string, expiresIn: number }>());
export const updateAuthStatus = createAction('[Auth] udpate auth status', props<{ isAuth: boolean }>());
export const submitEmailAndPassword = createAction('[Auth] submit email and password', props<{ loginInfo: LoginInfo, isSignin: boolean }>());
