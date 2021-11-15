import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { loadCurrentUser, loadCurrentUserComplete, setLoadStatus, submitEmailAndPassword, updateAuthStatus, updateToken } from "./auth.actions";
import { AuthDataService } from "./auth.data.service";
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { LoginInfo } from "src/app/models/login-info";
import { User } from "src/app/models/user";
import { LoadStatus } from "src/app/constants/load-status.constants";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authDataService: AuthDataService) {}

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadCurrentUser),
    mergeMap(() => this.authDataService.getUser()
    .pipe(
      switchMap((user: { currentUser: User }) => {
        let actions = [];
        actions.push(loadCurrentUserComplete({ user: user.currentUser }));
        actions.push(setLoadStatus({ status: LoadStatus.LOADED }));
        return actions;
      }),
      catchError(() => of(setLoadStatus({ status: LoadStatus.NOT_LOADED })))
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
          actions.push(setLoadStatus({ status: LoadStatus.LOADED }));
          return actions;
        }),
        catchError(() => of(setLoadStatus({ status: LoadStatus.NOT_LOADED })))
      ))
  ));
}
