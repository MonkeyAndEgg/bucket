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
import { USER_OPTIONS } from 'src/app/constants/header.constants';
import { LoadStatus } from 'src/app/constants/load-status.constants';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let el: DebugElement;
  let authService: any;
  let route: any;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('AuthService', {
      'getLoadStatus': of(LoadStatus.NOT_LOADED),
      'setLoadStatus': null,
      'submitAuth': null
    });
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [
        AuthComponent
      ],
      providers: [
        { provide: AuthService, useValue: serviceSpy },
        {
          provide: ActivatedRoute, useValue: {
            data: of({page: USER_OPTIONS.SIGN_IN})
          }
        }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AuthComponent);
      component = fixture.componentInstance;
      authService = TestBed.inject(AuthService);
      route = TestBed.inject(ActivatedRoute);
      el = fixture.debugElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading page when is authenticating', () => {
    authService.getLoadStatus.and.returnValue(of(LoadStatus.LOADING));
    fixture.detectChanges();
    const loadingMessage = el.queryAll(By.css('.spinner span'))[0];
    const spinner = el.queryAll(By.css('mat-spinner'));
    expect(loadingMessage.nativeElement.textContent).toContain('Authenticating your identity');
    expect(spinner.length).toEqual(1);
  });

  it('should display sign in page when isSignin is true', () => {
    component.isSignin = true;
    fixture.detectChanges();
    const title = el.queryAll(By.css('.title'));
    expect(title.length).toEqual(1);
    expect(title[0].nativeElement.textContent).toContain('Sign In');
    const message = el.queryAll(By.css('.info div'));
    expect(message.length).toEqual(1);
    expect(message[0].nativeElement.textContent).toContain('Do not have an account yet?');
    const inputs = el.queryAll(By.css('input'));
    expect(inputs.length).toEqual(2);
    const submitButton = el.queryAll(By.css('.submit'))[0];
    expect(submitButton.nativeElement.textContent).toContain('Submit');
    const resetPasswordLink = el.queryAll(By.css('.reset-password'));
    expect(resetPasswordLink.length).toEqual(1);
    expect(resetPasswordLink[0].nativeElement.textContent).toContain('Forget Password');
  });

  it('should display errors when inputs are valid', () => {
    component.isSignin = true;
    fixture.detectChanges();
    component.authForm.controls.email.setValue('123');
    component.authForm.controls.email.setErrors({ email: true });
    component.authForm.controls.password.setErrors({ required: true });
    component.authForm.controls.email.markAsTouched();
    component.authForm.controls.password.markAsTouched();
    fixture.detectChanges();
    const matErrors = el.queryAll(By.css('mat-error'));
    expect(matErrors.length).toEqual(2);
    expect(matErrors[0].nativeElement.textContent).toContain('valid email address');
    expect(matErrors[1].nativeElement.textContent).toContain('Password is required');
    component.authForm.controls.email.setValue('');
    component.authForm.controls.email.setErrors({ required: true });
    component.authForm.controls.email.markAsTouched();
    fixture.detectChanges();
    const matErrorsForEmptyEmail = el.queryAll(By.css('mat-error'))[0];
    expect(matErrorsForEmptyEmail.nativeElement.textContent).toContain('Email is required');
    expect(component.authForm.valid).toBeFalsy();
  });

  it('should display sign up page when isSignin is false', () => {
    route.data = of({page: USER_OPTIONS.SIGN_UP});
    fixture.detectChanges();
    const title = el.queryAll(By.css('.title'));
    expect(title.length).toEqual(1);
    expect(title[0].nativeElement.textContent).toContain('Sign Up');
    const message = el.queryAll(By.css('.info div'));
    expect(message.length).toEqual(1);
    expect(message[0].nativeElement.textContent).toContain('Already have an account?');
    const inputs = el.queryAll(By.css('input'));
    expect(inputs.length).toEqual(2);
    const submitButton = el.queryAll(By.css('.submit'))[0];
    expect(submitButton.nativeElement.textContent).toContain('Submit');
    const resetPasswordLink = el.queryAll(By.css('.reset-password'));
    expect(resetPasswordLink.length).toEqual(0);
  });
});
