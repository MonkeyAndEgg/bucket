import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonErrorStateMatcher } from '../../common/common-error-matcher';
import { ForgetPasswordService } from './forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });
  durationCounter = 0;
  matcher = new CommonErrorStateMatcher();

  constructor(private service: ForgetPasswordService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.countDownTimer(60);
    if (this.forgetForm && this.forgetForm.controls && this.forgetForm.controls.email) {
      this.service.requestPasswordReset(this.forgetForm.controls.email.value);
    }
  }

  private countDownTimer(count: number): void {
    this.durationCounter = count;
    const countingInterval = setInterval(() => {
      this.durationCounter -= 1;
      if (this.durationCounter === 0) {
        clearInterval(countingInterval);
      }
    }, 1000);
  }
}
