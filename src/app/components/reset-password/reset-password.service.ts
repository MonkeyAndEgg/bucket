import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LoadStatus } from "src/app/constants/load-status.constants";
import { resetPassword, setCurrentUser, setLoadStatus, updateToken } from "src/app/store/auth/auth.actions";
import { selectLoadStatus } from "src/app/store/auth/auth.selector";
import { clearStorageData } from "../../common/process-storage-data";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private store: Store) {}

  resetPassword(userId: string, password: string): void {
    this.store.dispatch(setLoadStatus({ status: LoadStatus.LOADING }));
    this.store.dispatch(resetPassword({ userId, password }));
  }

  getLoadStatus(): Observable<LoadStatus> {
    return this.store.select(selectLoadStatus);
  }

  setLoadStatus(status: LoadStatus): void {
    this.store.dispatch(setLoadStatus({ status }));
  }

  logoutUser(): void {
    this.store.dispatch(updateToken({ token: '', expiresIn: 0 }));
    this.store.dispatch(setCurrentUser({ user: undefined }));
    clearStorageData();
  }
}
