import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { loadCurrentUser, updateAuthStatus, updateToken } from "src/app/store/auth/auth.actions";
import { selectExpiration, selectIsAuth, selectToken, selectUser } from "src/app/store/auth/auth.selector";
import { loadCartById } from "src/app/store/order/order.actions";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private store: Store, private router: Router) {}

  loadUser(): void {
    this.store.dispatch(loadCurrentUser());
  }

  loadUserCart(id: string): void {
    this.store.dispatch(loadCartById({ id }));
  }

  getCurrentUser(): Observable<User | undefined> {
    return this.store.select(selectUser);
  }

  getIsAuth(): Observable<boolean> {
    return this.store.select(selectIsAuth);
  }

  getToken(): Observable<string> {
    return this.store.select(selectToken);
  }

  getExpiration(): Observable<number> {
    return this.store.select(selectExpiration);
  }

  updateToken(token: string, expiresIn: number): void {
    this.store.dispatch(updateToken({ token, expiresIn }));
  }

  updateAuthStatus(isAuth: boolean): void {
    this.store.dispatch(updateAuthStatus({ isAuth }));
  }

  signOut(): void {
    this.store.dispatch(updateToken({ token: '', expiresIn: 0 }))
    this.updateAuthStatus(false);
    this.clearStorageData();
    this.router.navigate(['/']);
  }

  saveStorageData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  clearStorageData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  getStorageTokenData(): { token: string, expirationDate: Date } | undefined {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expiration)
    };
  }

  initAuthTimer(expiresInSeconds: number) {
    console.log('The token expires in:', expiresInSeconds + ' seconds');
    const timer = setTimeout(() => {
      this.updateToken('', 0);
      this.updateAuthStatus(false);
      this.router.navigate(['/']);
      clearTimeout(timer);
      this.clearStorageData();
    }, expiresInSeconds * 1000);
  }

  verifyUserAuth() {
    const currentTime = new Date();
    const tokenData = this.getStorageTokenData();
    if (tokenData) {
      const expiresInSeconds = (tokenData?.expirationDate.getTime() - currentTime.getTime()) / 1000;
      if (expiresInSeconds > 0) {
        this.updateToken(tokenData.token, expiresInSeconds);
        this.updateAuthStatus(true)
        this.initAuthTimer(expiresInSeconds);
      } else {
        console.log('Your token is expired.');
      }
    }
  }
}
