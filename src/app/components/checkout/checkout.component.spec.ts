import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
});
