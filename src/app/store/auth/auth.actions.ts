import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";

export const loadCurrentUser = createAction('[Auth] load current user info');
export const loadCurrentUserComplete = createAction('[Auth] load current user info complete', props<{ user: User }>());
