import { createAction, props } from "@ngrx/store";
import { LoadStatus } from "src/app/constants/load-status.constants";
import { LoginInfo } from "src/app/models/login-info";
import { User } from "src/app/models/user";

export const loadCurrentUser = createAction('[Auth] load current user info');
export const setCurrentUser = createAction('[Auth] set current user', props<{ user: User | undefined }>());
export const updateToken = createAction('[Auth] update user token', props<{ token: string, expiresIn: number }>());
export const updateAuthStatus = createAction('[Auth] udpate auth status', props<{ isAuth: boolean }>());
export const submitEmailAndPassword = createAction('[Auth] submit email and password', props<{ loginInfo: LoginInfo, isSignin: boolean }>());
export const setLoadStatus = createAction('[Auth] set auth loading status', props<{ status: LoadStatus }>());
export const resetPassword = createAction('[Auth] reset user password', props<{ userId: string, password: string }>());
