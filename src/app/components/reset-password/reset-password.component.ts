import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadStatus } from 'src/app/constants/load-status.constants';
import { CommonErrorStateMatcher } from '../../common/common-error-matcher';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  hide = true;
  resetForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  });
  matcher = new CommonErrorStateMatcher();
  destroySubscription$ = new Subject();
  loadStatus = LoadStatus.NOT_LOADED;
  LoadStatus = LoadStatus;
  userId: string | undefined;

  constructor(private resetService: ResetPasswordService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // log out the current user before reset password for now
    // TODO decide whether remove this and allow user reset password while they are authed
    this.resetService.logoutUser();

    this.route.params.pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe(params => {
      this.userId = params.userId;
    });

    this.resetService.getLoadStatus().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((status: LoadStatus) => {
      this.loadStatus = status;
    });
  }

  ngOnDestroy(): void {
    this.resetService.setLoadStatus(LoadStatus.NOT_LOADED);
    this.destroySubscription$.next(true);
  }

  onSubmit(): void {
    if (this.userId && this.resetForm && this.resetForm.controls && this.resetForm.controls.password) {
      this.resetService.resetPassword(this.userId, this.resetForm.controls.password.value);
    }
  }
}
