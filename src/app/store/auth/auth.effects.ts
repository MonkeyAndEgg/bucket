import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { loadCurrentUser, loadCurrentUserComplete } from "./auth.actions";
import { AuthDataService } from "./auth.data.service";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY } from "rxjs";

@Injectable()
export class AuthEffects {
  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadCurrentUser),
    mergeMap(() => this.authDataService.getUser()
    .pipe(
      map((user: any) => {
        return loadCurrentUserComplete({ user: user.currentUser });
      }),
      catchError(() => EMPTY)
    ))
  ));

  constructor(private actions$: Actions,
              private authDataService: AuthDataService) {}
}
