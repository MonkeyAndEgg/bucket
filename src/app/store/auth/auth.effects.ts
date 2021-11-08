import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { loadCurrentUser, loadCurrentUserComplete, submitEmailAndPassword, updateAuthStatus, updateToken } from "./auth.actions";
import { AuthDataService } from "./auth.data.service";
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { EMPTY } from "rxjs";
import { LoginInfo } from "src/app/models/login-info";
import { User } from "src/app/models/user";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authDataService: AuthDataService) {}

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadCurrentUser),
    mergeMap(() => this.authDataService.getUser()
    .pipe(
      map((user: { currentUser: User }) => {
        return loadCurrentUserComplete({ user: user.currentUser });
      }),
      catchError(() => EMPTY)
    ))
  ));

  submitEmailAndPassword$ = createEffect(() => this.actions$.pipe(
    ofType(submitEmailAndPassword),
    mergeMap((payload: { loginInfo: LoginInfo, isSignin: boolean }) =>
      this.authDataService.requestAuthentication(payload.loginInfo, payload.isSignin)
      .pipe(
        switchMap((res: { userId: string, token: string, expiresIn: number }) => {
          let actions = [];
          actions.push(updateToken({ token: res.token, expiresIn: res.expiresIn }));
          actions.push(updateAuthStatus({ isAuth: true }));
          return actions;
        }),
        catchError(() => EMPTY)
      ))
  ));
}
