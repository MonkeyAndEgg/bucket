import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError } from "rxjs/operators";
import { LoginInfo } from "src/app/models/login-info";
import { loadCurrentUser, submitEmailAndPassword} from "src/app/store/auth/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  loadUser(): void {
    this.store.dispatch(loadCurrentUser());
  }

  submitAuth(loginInfo: LoginInfo, isSignin: boolean) : void {
    this.store.dispatch(submitEmailAndPassword({ loginInfo, isSignin }));
  }
}
