import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LoadStatus } from "src/app/constants/load-status.constants";
import { LoginInfo } from "src/app/models/login-info";
import { User } from "src/app/models/user";
import { setLoadStatus, submitEmailAndPassword} from "src/app/store/auth/auth.actions";
import { selectLoadStatus, selectUser } from "src/app/store/auth/auth.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store) {}

  getCurrentUser(): Observable<User | undefined> {
    return this.store.select(selectUser);
  }

  getLoadStatus(): Observable<LoadStatus> {
    return this.store.select(selectLoadStatus);
  }

  setLoadStatus(status: LoadStatus): void {
    this.store.dispatch(setLoadStatus({ status }));
  }

  submitAuth(loginInfo: LoginInfo, isSignin: boolean) : void {
    this.store.dispatch(setLoadStatus({ status: LoadStatus.LOADING }));
    this.store.dispatch(submitEmailAndPassword({ loginInfo, isSignin }));
  }
}
