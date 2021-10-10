import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { loadCurrentUser } from "src/app/store/auth/auth.actions";
import { selectUser } from "src/app/store/auth/auth.selector";

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
}
