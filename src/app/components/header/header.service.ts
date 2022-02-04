import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart";
import { User } from "src/app/models/user";
import { loadCurrentUser, setCurrentUser, updateToken } from "src/app/store/auth/auth.actions";
import { selectExpiration, selectToken, selectUser } from "src/app/store/auth/auth.selector";
import { loadCartById, loadOrdersByUserId } from "src/app/store/order/order.actions";
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

  loadUserOrders(userId: string): void {
    this.store.dispatch(loadOrdersByUserId({ userId }));
  }

  getCurrentUser(): Observable<User | undefined> {
    return this.store.select(selectUser);
  }

  getUserCart(): Observable<Cart | undefined> {
    return this.store.select(selectCurrentCart);
  }

  getToken(): Observable<string> {
    return this.store.select(selectToken);
  }

  getExpiration(): Observable<number> {
    return this.store.select(selectExpiration);
  }

  signOut(): void {
    this.updateToken('', 0);
    this.store.dispatch(setCurrentUser({ user: undefined }));
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

  initAuthTimer(expiresInSeconds: number): void {
    console.log('The token expires in:', expiresInSeconds + ' seconds');
    const timer = setTimeout(() => {
      this.signOut();
      clearTimeout(timer);
    }, expiresInSeconds * 1000);
  }

  verifyUserAuth(): void {
    const currentTime = new Date();
    const tokenData = this.getStorageTokenData();
    if (tokenData) {
      const expiresInSeconds = (tokenData?.expirationDate.getTime() - currentTime.getTime()) / 1000;
      if (expiresInSeconds > 0) {
        this.updateToken(tokenData.token, expiresInSeconds);
      } else {
        console.log('Your token is expired.');
      }
    }
  }

  private updateToken(token: string, expiresIn: number): void {
    this.store.dispatch(updateToken({ token, expiresIn }));
  }
}
