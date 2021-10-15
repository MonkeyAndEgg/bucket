import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AUTH_OPTIONS } from 'src/app/constants/header.constants';
import { LoginInfo } from 'src/app/models/login-info';
import { AuthService } from './auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class AuthErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  title = '';
  hide = true;
  isSignin = false;
  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  matcher = new AuthErrorStateMatcher();
  destroySubscription$ = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initFormGroup();
    this.route.data.subscribe(data => {
      this.isSignin = data.page === AUTH_OPTIONS.SIGN_IN ? true : false;
      this.title = this.isSignin ? AUTH_OPTIONS.SIGN_IN : AUTH_OPTIONS.SIGN_UP;
    });
    this.verifyUserAuth();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onSubmit(): void {
    const user: LoginInfo = {
      email: this.authForm.controls.email.value,
      password: this.authForm.controls.password.value
    }
    this.authService.submitAuth(user, this.isSignin).pipe(takeUntil(this.destroySubscription$)).subscribe((res: any) => {
      this.handleAuthResponse(res);
    });
  }

  verifyUserAuth() {
    const currentTime = new Date();
    const tokenData = this.getStorageTokenData();
    if (tokenData) {
      const expiresInSeconds = (tokenData?.expirationDate.getTime() - currentTime.getTime()) / 1000;
      if (expiresInSeconds > 0) {
        this.authService.updateToken(tokenData.token);
        this.authService.updateAuthStatus(true)
        this.initAuthTimer(expiresInSeconds);
      } else {
        console.log('Your token is expired.');
      }
    }
  }

  private handleAuthResponse(res: any): void {
    const expiresInSeconds = res.expiresIn;
    this.initAuthTimer(expiresInSeconds);
    const { userId, token } = res;
    const isAuth = token && token !== ''
    this.authService.updateToken(token);
    this.authService.updateAuthStatus(isAuth)
    const expiration = new Date().getTime() + expiresInSeconds * 1000;
    this.saveStorageData(token, new Date(expiration));
    this.authService.loadUser();
    this.router.navigate(['/']);
  }

  private initAuthTimer(expiresInSeconds: number) {
    console.log('The token expires in:', expiresInSeconds);
    const timer = setTimeout(() => {
      this.authService.updateToken('');
      this.authService.updateAuthStatus(false);
      this.router.navigate(['/']);
      clearTimeout(timer);
      this.clearStorageData();
    }, expiresInSeconds * 1000);
  }

  private saveStorageData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearStorageData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private initFormGroup(): void {
    this.authForm.setControl('email', new FormControl('', [
      Validators.required,
      Validators.email,
    ]));
    this.authForm.setControl('password', new FormControl('', [
      Validators.required
    ]));
  }

  private getStorageTokenData(): { token: string, expirationDate: Date } | undefined {
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
}
