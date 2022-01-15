import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CheckoutComponent } from './checkout.component';
import { CheckoutService } from './checkout.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let el: DebugElement;
  let checkoutService: any;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('CheckoutService', {
      'processPayment': null,
      'getUserCart': of(undefined),
      'getCompletedPayment': of({})
    });
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatStepperModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [ CheckoutComponent ],
      providers: [
        { provide: CheckoutService, useValue: serviceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CheckoutComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      checkoutService = TestBed.inject(CheckoutService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display shipping address page by default', () => {
    const labels = el.queryAll(By.css('.shipping .title'));
    expect(labels.length).toEqual(1);
    expect(labels[0].nativeElement.textContent).toEqual('Shipping Address');
    const matLabels = el.queryAll(By.css('.shipping mat-label'));
    expect(matLabels.length).toEqual(4);
    expect(matLabels[0].nativeElement.textContent).toEqual('Address');
    expect(matLabels[1].nativeElement.textContent).toEqual('City');
    expect(matLabels[2].nativeElement.textContent).toEqual('State');
    expect(matLabels[3].nativeElement.textContent).toEqual('Postal Code');
  });

  it('should still display shipping address page by default', () => {
    const headers = el.queryAll(By.css('mat-step-header'));
    expect(headers.length).toEqual(3);
    headers[1].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    const labels = el.queryAll(By.css('.shipping .title'));
    expect(labels.length).toEqual(1);
    expect(labels[0].nativeElement.textContent).toEqual('Shipping Address');
  });

  it('should display billing address page by default', () => {
    component.shippingForm.controls.address.setValue('Test Address');
    component.shippingForm.controls.city.setValue('Melbourne');
    component.shippingForm.controls.state.setValue('VIC');
    component.shippingForm.controls.postCode.setValue('6360');
    fixture.detectChanges();
    const headers = el.queryAll(By.css('mat-step-header'));
    expect(headers.length).toEqual(3);
    headers[1].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    const labels = el.queryAll(By.css('.billing .title'));
    expect(labels.length).toEqual(1);
    expect(labels[0].nativeElement.textContent).toEqual('Billing Address');
  });

  it('should display Review&Confirm page by default', () => {
    component.shippingForm.controls.address.setValue('Test Address');
    component.shippingForm.controls.city.setValue('Melbourne');
    component.shippingForm.controls.state.setValue('VIC');
    component.shippingForm.controls.postCode.setValue('6360');
    fixture.detectChanges();
    const headers = el.queryAll(By.css('mat-step-header'));
    expect(headers.length).toEqual(3);
    headers[1].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    const checkbox = el.queryAll(By.css('mat-checkbox'));
    expect(checkbox.length).toEqual(1);
    checkbox[0].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    const buttons = el.queryAll(By.css('button'));
    expect(buttons.length).toEqual(5);
    buttons[2].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    const messages = el.queryAll(By.css('.info span'));
    expect(messages.length).toEqual(2);
    expect(messages[1].nativeElement.textContent).toContain('Please confirm your information and then process payment');
    expect(buttons[4].nativeElement.textContent).toContain('Checkout');
  });

  it('should trigger onClickCheckout when clicking checkout button', () => {
    spyOn(component, 'onClickCheckout');
    component.shippingForm.controls.address.setValue('Test Address');
    component.shippingForm.controls.city.setValue('Melbourne');
    component.shippingForm.controls.state.setValue('VIC');
    component.shippingForm.controls.postCode.setValue('6360');
    fixture.detectChanges();
    const headers = el.queryAll(By.css('mat-step-header'));
    headers[1].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    const checkbox = el.queryAll(By.css('mat-checkbox'));
    checkbox[0].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    const buttons = el.queryAll(By.css('button'));
    buttons[2].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    buttons[4].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    expect(component.onClickCheckout).toHaveBeenCalled();
  });
});
