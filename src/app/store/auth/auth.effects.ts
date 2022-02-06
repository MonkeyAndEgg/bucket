import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { loadCurrentUser, requestPasswordReset, resetPassword, setCurrentUser, setLoadStatus, submitEmailAndPassword, updateToken } from "./auth.actions";
import { AuthDataService } from "./auth.data.service";
import { mergeMap, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from "rxjs";
import { LoginInfo } from "src/app/models/login-info";
import { User } from "src/app/models/user";
import { LoadStatus } from "src/app/constants/load-status.constants";
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorHandler } from "src/app/common/error-handler";
import { Store } from "@ngrx/store";
import { selectToken } from "./auth.selector";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,
              private store: Store,
              private authDataService: AuthDataService) {}

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadCurrentUser),
    mergeMap(() => this.authDataService.getUser()
    .pipe(
      switchMap((user: { currentUser: User }) => {
        let actions = [];
        actions.push(setCurrentUser({ user: user.currentUser }));
        actions.push(setLoadStatus({ status: LoadStatus.LOADED }));
        return actions;
      }),
      catchError((err) => {
        errorHandler(this.snackBar, err);
        return of(setLoadStatus({ status: LoadStatus.NOT_LOADED }));
      })
    ))
  ));

  submitEmailAndPassword$ = createEffect(() => this.actions$.pipe(
    ofType(submitEmailAndPassword),
    mergeMap((payload: { loginInfo: LoginInfo, isSignin: boolean }) =>
      this.authDataService.requestAuthentication(payload.loginInfo, payload.isSignin)
      .pipe(
        switchMap((res: { userId: string, token: string, expiresIn: number }) => {
          let actions = [];
          actions.push(loadCurrentUser());
          actions.push(updateToken({ token: res.token, expiresIn: res.expiresIn }));
          actions.push(setLoadStatus({ status: LoadStatus.LOADED }));
          return actions;
        }),
        catchError((err) => {
          errorHandler(this.snackBar, err);
          return of(setLoadStatus({ status: LoadStatus.NOT_LOADED }));
        })
      ))
  ));

  requestPasswordReset$ = createEffect(() => this.actions$.pipe(
    ofType(requestPasswordReset),
    mergeMap((payload: { email: string }) =>
      this.authDataService.requestPasswordReset(payload.email)
      .pipe(
        withLatestFrom(this.store.select(selectToken)),
        switchMap(([res, token]: [{ userId: string, token: string, expiresIn: number }, string]) => {
          let actions = [];
          if (token) {
            actions.push(updateToken({ token: res.token, expiresIn: res.expiresIn }));
            actions.push(setLoadStatus({ status: LoadStatus.LOADED }));
          }
          return actions;
        }),
        catchError((err) => {
          errorHandler(this.snackBar, err);
          return of(setLoadStatus({ status: LoadStatus.NOT_LOADED }));
        })
      )
    )
  ));

  resetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(resetPassword),
    mergeMap((payload: { userId: string, password: string }) =>
      this.authDataService.resetPassword(payload.userId, payload.password)
      .pipe(
        switchMap((res: { userId: string, token: string, expiresIn: number }) => {
          let actions = [];
          actions.push(updateToken({ token: res.token, expiresIn: res.expiresIn }));
          actions.push(setLoadStatus({ status: LoadStatus.LOADED }));
          return actions;
        }),
        catchError((err) => {
          errorHandler(this.snackBar, err);
          return of(setLoadStatus({ status: LoadStatus.NOT_LOADED }));
        })
      )
    )
  ));
}
