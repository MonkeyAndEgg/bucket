import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CheckoutComponent } from './checkout.component';
import { CheckoutService } from './checkout.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('CheckoutService', {
      'processPayment': null,
      'getUserCart': of(undefined),
      'getCompletedPayment': of({})
    });
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        { provide: CheckoutService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
