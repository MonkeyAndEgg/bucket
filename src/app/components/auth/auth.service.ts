import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginInfo } from "src/app/models/login-info";
import { loadCurrentUser, updateAuthStatus, updateToken } from "src/app/store/auth/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  submitAuth(loginInfo: LoginInfo, isSignin: boolean): Observable<LoginInfo> {
    const baseUrl = 'http://localhost:3000';
    const url = isSignin ? baseUrl + '/api/signin' : baseUrl + '/api/signup';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return this.http.post<LoginInfo>(url, loginInfo, httpOptions);
  }

  loadUser(): void {
    this.store.dispatch(loadCurrentUser());
  }

  updateToken(token: string): void {
    this.store.dispatch(updateToken({ token }));
  }

  updateAuthStatus(isAuth: boolean): void {
    this.store.dispatch(updateAuthStatus({ isAuth }));
  }
}
