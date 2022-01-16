import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ViewProductDetailComponent } from './view-product-detail.component';
import { ViewProductDetailService } from './view-product-detail.service';

describe('ViewProductDetailComponent', () => {
  let component: ViewProductDetailComponent;
  let fixture: ComponentFixture<ViewProductDetailComponent>;
  let el: DebugElement;
  const product = {
    _id: "61a0860fefb61694ea88cf45",
    name: "guinea pig",
    price: 29.3,
    description: "Guinea Pigs are considered to be an ideal first pet! They are adorable and loving animals that are easy to maintain and handle. There are a number of treats and toys available to use when bonding with your guinea pig. Guinea pigs are very affectionate and will snuggle up to their pet parents. They are one of the few small animals that may enjoy interacting with you as much as you do with them!",
    imageUrl: "http://localhost:3000/images/1637910031081.png",
    numOfStocks: 99,
    type: "pets",
    createdAt: "2021-11-26T07:00:31.143Z",
    __v: 0
  };

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('ViewProductDetailService', {
      'loadProductById': null,
      'getSelectedProduct': of(undefined),
      'getUserCart': of(undefined),
      'addToCart': null
    });
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        MatButtonModule
      ],
      declarations: [ ViewProductDetailComponent ],
      providers: [
        { provide: ViewProductDetailService, useValue: serviceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ViewProductDetailComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display not found page when product is not defined', () => {
    const notFoundPage = el.queryAll(By.css('.not-found'));
    expect(notFoundPage.length).toEqual(1);
  });

  it('should display product detail page when product is provided', () => {
    component.product = product;
    fixture.detectChanges();
    const productImage = el.queryAll(By.css('.content-left img'));
    const productFieldLabels = el.queryAll(By.css('.field-value label'));
    const quantityChangeIcons = el.queryAll(By.css('.material-icons'));
    expect(productImage.length).toEqual(1);
    expect(productFieldLabels.length).toEqual(4);
    expect(productFieldLabels[0].nativeElement.textContent).toContain('Product Name');
    expect(productFieldLabels[1].nativeElement.textContent).toContain('Description');
    expect(productFieldLabels[2].nativeElement.textContent).toContain('Number of stocks');
    expect(productFieldLabels[3].nativeElement.textContent).toContain('Price');
    expect(quantityChangeIcons.length).toEqual(2);
  });

  it('should call increment/decrement functions when clicking material icons', () => {
    spyOn(component, 'decrementProducts');
    spyOn(component, 'incrementProducts');
    component.product = product;
    fixture.detectChanges();
    const quantityChangeIcons = el.queryAll(By.css('.material-icons'));
    quantityChangeIcons[0].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    expect(component.decrementProducts).toHaveBeenCalled();
    quantityChangeIcons[1].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    expect(component.incrementProducts).toHaveBeenCalled();
  });
});
