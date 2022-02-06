import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductListModule } from '../../components/product-list/product-list.module';
import { ProductListService } from '../../components/product-list/product-list.service';
import { ShowCaseModule } from '../../components/show-case/show-case.module';
import { LandingComponent } from './landing.component';
import { LandingService } from './landing.service';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let el: DebugElement;
  let langdingService: any;
  const products = [
    {
      _id: "61aac17272803d7f8338e6eb",
      name: "Furla crossbody mini-bag",
      price: 311.43,
      description: "Dimensions: Width: 17.5cm, Height: 14.5cm, Depth: 8.5cm, Strap: 55.5cm",
      imageUrl: "",
      numOfStocks: 20,
      type: "bags",
      createdAt: "2021-12-04T01:16:34.717Z",
      __v: 0
    },
    {
      _id: "61a0860fefb61694ea88cf45",
      name: "guinea pig",
      price: 29.3,
      description: "Guinea Pigs are considered to be an ideal first pet! They are adorable and loving animals that are easy to maintain and handle. There are a number of treats and toys available to use when bonding with your guinea pig. Guinea pigs are very affectionate and will snuggle up to their pet parents. They are one of the few small animals that may enjoy interacting with you as much as you do with them!",
      imageUrl: "",
      numOfStocks: 99,
      type: "pets",
      createdAt: "2021-11-26T07:00:31.143Z",
      __v: 0
    }
  ];

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('LandingService', {
      'getProducts': of([]),
      'loadProducts': null
    });
    const productListServiceSpy = jasmine.createSpyObj('ProductListService', {
      'getCurrentUser': of(undefined),
      'getUserCart': of(undefined),
      'addToCart': null,
      'deleteProduct': null
    });
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        ProductListModule,
        ShowCaseModule,
        NoopAnimationsModule
      ],
      declarations: [ LandingComponent ],
      providers: [
        { provide: LandingService, useValue: serviceSpy },
        { provide: ProductListService, useValue: productListServiceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(LandingComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      langdingService = TestBed.inject(LandingService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper labels and carousel', () => {
    const showCase = el.queryAll(By.css('app-show-case'));
    expect(showCase.length).toEqual(1);
    const listHeader = el.queryAll(By.css('.list-header h1'))[0];
    expect(listHeader.nativeElement.textContent).toContain('New products');
    const button = el.queryAll(By.css('.list-header button'))[0];
    expect(button.nativeElement.textContent).toContain('View All Products');
  });

  it('should display 2 products under New Products', () => {
    langdingService.getProducts.and.returnValue(of(products));
    fixture.detectChanges();
    const productItems = el.queryAll(By.css('mat-grid-tile'));
    expect(productItems.length).toEqual(2);
    const productLabel = el.queryAll(By.css('mat-grid-tile label'))[0];
    expect(productLabel.nativeElement.textContent).toContain('Furla crossbody mini-bag');
    const productPrice = el.queryAll(By.css('mat-card-actions label'))[0];
    expect(productPrice.nativeElement.textContent).toContain('311.43');
  });
});
