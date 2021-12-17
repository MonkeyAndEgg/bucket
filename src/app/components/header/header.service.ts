import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart";
import { User } from "src/app/models/user";
import { loadCurrentUser, setCurrentUser, updateAuthStatus, updateToken } from "src/app/store/auth/auth.actions";
import { selectExpiration, selectIsAuth, selectToken, selectUser } from "src/app/store/auth/auth.selector";
import { loadCartById } from "src/app/store/order/order.actions";
import { selectCurrentCart } from "src/app/store/order/order.selector";
import { clearStorageData } from "../common/process-storage-data";

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

  getUserCart(): Observable<Cart | undefined> {
    return this.store.select(selectCurrentCart);
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
    this.store.dispatch(updateToken({ token: '', expiresIn: 0 }));
    this.store.dispatch(setCurrentUser({ user: undefined }));
    this.updateAuthStatus(false);
    clearStorageData();
    this.router.navigate(['/']);
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
      clearStorageData();
    }, expiresInSeconds * 1000);
  }

  verifyUserAuth() {
    const currentTime = new Date();
    const tokenData = this.getStorageTokenData();
    if (tokenData) {
      const expiresInSeconds = (tokenData?.expirationDate.getTime() - currentTime.getTime()) / 1000;
      if (expiresInSeconds > 0) {
        this.updateToken(tokenData.token, expiresInSeconds);
        this.updateAuthStatus(true);
      } else {
        console.log('Your token is expired.');
      }
    }
  }
}
