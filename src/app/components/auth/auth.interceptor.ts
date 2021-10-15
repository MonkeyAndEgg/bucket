import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectToken } from "src/app/store/auth/auth.selector";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token = '';
  constructor(private store: Store) {
    this.store.select(selectToken).subscribe((token: string) => {
      this.token = token;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let update = {};
    if (this.token && this.token !== '') {
      update = {
        headers: req.headers.set('Authorization', 'Bearer ' + this.token)
      };
    }
    const request = req.clone(update);
    return next.handle(request);
  }
}
