import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { USER_OPTIONS } from 'src/app/constants/header.constants';
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
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initFormGroup();
    this.route.data.subscribe(data => {
      this.isSignin = data.page === USER_OPTIONS.SIGN_IN ? true : false;
      this.title = this.isSignin ? USER_OPTIONS.SIGN_IN : USER_OPTIONS.SIGN_UP;
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onSubmit(): void {
    const user: LoginInfo = {
      email: this.authForm.controls.email.value,
      password: this.authForm.controls.password.value
    }
    this.authService.submitAuth(user, this.isSignin);
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
}
