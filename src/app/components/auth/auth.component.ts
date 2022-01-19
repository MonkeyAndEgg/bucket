import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { USER_OPTIONS } from 'src/app/constants/header.constants';
import { LoadStatus } from 'src/app/constants/load-status.constants';
import { LoginInfo } from 'src/app/models/login-info';
import { CommonErrorStateMatcher } from '../common/common-error-matcher';
import { AuthService } from './auth.service';

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
  matcher = new CommonErrorStateMatcher();
  destroySubscription$ = new Subject();
  loadStatus = LoadStatus.NOT_LOADED;
  LoadStatus = LoadStatus;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initFormGroup();
    this.authService.setLoadStatus(LoadStatus.NOT_LOADED);

    this.route.data.subscribe(data => {
      this.isSignin = data.page === USER_OPTIONS.SIGN_IN ? true : false;
      this.title = this.isSignin ? USER_OPTIONS.SIGN_IN : USER_OPTIONS.SIGN_UP;
    });

    this.authService.getLoadStatus().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((status: LoadStatus) => {
      this.loadStatus = status;
      if (this.loadStatus === LoadStatus.LOADED) {
        // navigate to landing page
        this.router.navigate(['/']);
      }
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
