import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CartComponent } from './cart.component';
import { CartService } from './cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let el: DebugElement;
  let cartService: any;
  const mockedCartData = {
    _id: "61a3e8a4cd6c289172fa7a48",
    userId:"618b68225620cb081ba2e9a3",
    products:[
      {
        product: {
          _id:"619c7ee2241323e04605ef9d",
          name:"Moschino Teddy Bear Bag",
          price:669.99,
          description:"Soft fabric handbag in the shape of Moschino Teddy Bear.",
          imageUrl:"",
          numOfStocks:99,
          type:"bags",
          createdAt:"2021-11-23T05:40:50.301Z",
          __v:0
        },
        quantity:2,
        _id:"61a3efdbcd6c289172fa7a8e"
      },
      {
        product:{
          _id:"619c7dc7241323e04605ef8e",
          name:"Play Station 5",
          price:599.99,
          description:"Get this amazing play station 5. Just have few stock left!",
          imageUrl:"",
          numOfStocks:9,
          type:"electronic_devices",
          createdAt:"2021-11-23T05:36:07.133Z",
          __v:0
        },
        quantity:1,
        _id:"61a3efdbcd6c289172fa7a8f"
      }
    ],
    __v:5
  };
  let totalPrice: number;
  let serviceSpy: any;
  beforeEach(waitForAsync(() => {
    serviceSpy = jasmine.createSpyObj('CartService', {
      'updateCart': null,
      'loadUserOrders': null,
      'getUserCart': of(undefined),
      'getUserOrders': of([]),
      'getCompletedPayment': of({})
    });
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ CartComponent ],
      providers: [
        { provide: CartService, useValue: serviceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CartComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      cartService = TestBed.inject(CartService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 3 info-field labels on the checkout div', () => {
    const labels = el.queryAll(By.css('.info-field label'));
    expect(labels.length).toEqual(3);
    expect(labels[0].nativeElement.textContent).toEqual('Product Subtotal');
    expect(labels[1].nativeElement.textContent).toEqual('Shipping');
    expect(labels[2].nativeElement.textContent).toEqual('Order Total(USD)');
  });

  it('should display 2 buttons under actions div', () => {
    const buttons = el.queryAll(By.css('.actions button'));
    expect(buttons.length).toEqual(2);
    expect(buttons[0].nativeElement.textContent).toEqual('Continue Shopping');
    expect(buttons[1].nativeElement.textContent).toEqual('Checkout');
  });

  it('should display 2 order items', () => {
    cartService.getUserCart.and.returnValue(of(mockedCartData));
    fixture.detectChanges();
    const items = el.queryAll(By.css('.orders .order-item'));
    expect(items.length).toEqual(2);
    const values = el.queryAll(By.css('.info-field span'));
    totalPrice = 0;
    mockedCartData.products.forEach(product => totalPrice += product.product.price * product.quantity);
    expect(values[0].nativeElement.textContent).toEqual('$' + totalPrice);
    expect(values[2].nativeElement.textContent).toEqual('$' + totalPrice);
  });

  it('should display remove button for each order item', () => {
    cartService.getUserCart.and.returnValue(of(mockedCartData));
    fixture.detectChanges();
    const buttons = el.queryAll(By.css('.item-field button'));
    expect(buttons.length).toEqual(2);
    expect(buttons[0].nativeElement.textContent).toEqual('Remove');
    expect(buttons[1].nativeElement.textContent).toEqual('Remove');
  });
});
