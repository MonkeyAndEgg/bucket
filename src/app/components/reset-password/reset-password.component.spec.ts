import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoadStatus } from 'src/app/constants/load-status.constants';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './reset-password.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let el: DebugElement;
  let service: any;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('ResetPasswordService', {
      'getLoadStatus': of(LoadStatus.NOT_LOADED),
      'setLoadStatus': null,
      'logoutUser': null,
      'resetPassword': null
    });
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ ResetPasswordComponent ],
      providers: [
        { provide: ResetPasswordService, useValue: serviceSpy },
        {
          provide: ActivatedRoute, useValue: {
            params: of({userId: '123456'})
          }
        }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ResetPasswordComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      service = TestBed.inject(ResetPasswordService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display reset password page when not loaded', () => {
    fixture.detectChanges();
    const title = el.queryAll(By.css('.reset-form .title'))[0];
    const matLabel = el.queryAll(By.css('mat-label'))[0];
    const resetButton = el.queryAll(By.css('.submit'))[0];
    expect(title.nativeElement.textContent).toContain('Reset Your Password');
    expect(matLabel.nativeElement.textContent).toContain('Enter your new password');
    expect(resetButton.nativeElement.textContent).toContain('Reset');
    component.resetForm.controls.password.markAsTouched();
    expect(component.resetForm.controls.password.valid).toBeFalsy();
    component.resetForm.controls.password.setErrors({ 'required': true });
    fixture.detectChanges();
    const error = el.queryAll(By.css('mat-error'))[0];
    expect(error.nativeElement.textContent).toContain('required');
  });

  it('should display resetting message when loading', () => {
    service.getLoadStatus.and.returnValue(of(LoadStatus.LOADING));
    fixture.detectChanges();
    const spinner = el.queryAll(By.css('mat-spinner'));
    const message = el.queryAll(By.css('.spinner span'))[0];
    expect(spinner.length).toEqual(1);
    expect(message.nativeElement.textContent).toContain('Resetting your password');
  });

  it('should display success page when loaded', () => {
    service.getLoadStatus.and.returnValue(of(LoadStatus.LOADED));
    fixture.detectChanges();
    const button = el.queryAll(By.css('button'))[0];
    const message = el.queryAll(By.css('.container span'))[0];
    expect(message.nativeElement.textContent).toContain('Your password is reset successfully');
    expect(button.nativeElement.textContent).toContain('Go Shopping');
  });
});
