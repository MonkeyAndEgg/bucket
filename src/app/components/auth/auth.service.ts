import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginInfo } from "src/app/models/login-info";
import { loadCurrentUser, submitEmailAndPassword} from "src/app/store/auth/auth.actions";
import { selectIsAuth } from "src/app/store/auth/auth.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store) {}

  loadUser(): void {
    this.store.dispatch(loadCurrentUser());
  }

  loadIsAuth(): Observable<boolean> {
    return this.store.select(selectIsAuth);
  }

  submitAuth(loginInfo: LoginInfo, isSignin: boolean) : void {
    this.store.dispatch(submitEmailAndPassword({ loginInfo, isSignin }));
  }
}
