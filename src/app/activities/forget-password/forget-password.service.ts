import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { requestPasswordReset } from "src/app/store/auth/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  constructor(private store: Store) {}

  requestPasswordReset(email: string): void {
    this.store.dispatch(requestPasswordReset({ email }));
  }
}
