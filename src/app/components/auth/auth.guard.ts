import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private isAuth = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getIsAuth().subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.isAuth) {
      this.router.navigate(['/']);
    }
    return this.isAuth;
  }
}
