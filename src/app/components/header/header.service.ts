import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { loadCurrentUser, updateAuthStatus, updateToken } from "src/app/store/auth/auth.actions";
import { selectIsAuth, selectUser } from "src/app/store/auth/auth.selector";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private store: Store) {}

  loadUser(): void {
    this.store.dispatch(loadCurrentUser());
  }

  getCurrentUser(): Observable<User> {
    return this.store.select(selectUser);
  }

  getIsAuth(): Observable<boolean> {
    return this.store.select(selectIsAuth);
  }

  updateAuthStatus(isAuth: boolean): void {
    this.store.dispatch(updateAuthStatus({ isAuth }));
  }

  signOut(): void {
    this.store.dispatch(updateToken({ token: '' }))
    this.updateAuthStatus(false);
  }
}
