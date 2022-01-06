import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartComponent } from './cart.component';
import { CartService } from './cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('CartService', {
      'updateCart': null,
      'getUserCart': of(undefined),
      'getCompletedPayment': of({})
    });
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [
        { provide: CartService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
