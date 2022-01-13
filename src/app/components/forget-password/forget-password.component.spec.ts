import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { ForgetPasswordService } from './forget-password.service';

describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  let el: DebugElement;
  let forgetPasswordService: any;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('ForgetPasswordService', ['requestPasswordReset']);
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ForgetPasswordRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [ ForgetPasswordComponent ],
      providers: [
        { provide: ForgetPasswordService, useValue: serviceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ForgetPasswordComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      forgetPasswordService = TestBed.inject(ForgetPasswordService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper titles and labels', () => {
    const titles = el.queryAll(By.css('.title'));
    expect(titles.length).toEqual(1);
    expect(titles[0].nativeElement.textContent).toContain('Reset Password');
    const labels = el.queryAll(By.css('mat-label'));
    expect(labels.length).toEqual(1);
    expect(labels[0].nativeElement.textContent).toContain('Email');
    const button = el.queryAll(By.css('button'))[0];
    expect(button.nativeElement.textContent).toContain('Send Email');
  });

  it('should get invalid forgetForm when the input is empty', () => {
    expect(component.forgetForm.controls.email.valid).toBeFalsy();
  });

  it('should display error message when invalid email is entered', () => {
    const email = component.forgetForm.controls.email;
    email.setValue('12345');
    expect(component.forgetForm.controls.email.valid).toBeFalsy();
    component.forgetForm.controls.email.markAsTouched();
    fixture.detectChanges();
    const errors = el.queryAll(By.css('mat-error'));
    expect(errors.length).toBe(1);
    expect(errors[0].nativeElement.textContent).toContain('Please enter a valid email address');
  });

  it('should get valid forgetForm when the input is valid email format', () => {
    const email = component.forgetForm.controls.email;
    email.setValue('12345@test.com');
    expect(component.forgetForm.controls.email.valid).toBeTruthy();
  });

  it('should trigger onSubmit when a valid email is given', () => {
    spyOn(component, 'onSubmit');
    const email = component.forgetForm.controls.email;
    email.setValue('12345@test.com');
    component.forgetForm.controls.email.markAsTouched();
    fixture.detectChanges();
    const button = el.queryAll(By.css('button'))[0];
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
