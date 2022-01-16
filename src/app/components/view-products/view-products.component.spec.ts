import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductListModule } from '../product-list/product-list.module';
import { ProductListService } from '../product-list/product-list.service';
import { ViewProductService } from './view-product.service';
import { ViewProductsComponent } from './view-products.component';

describe('ViewProductsComponent', () => {
  let component: ViewProductsComponent;
  let fixture: ComponentFixture<ViewProductsComponent>;
  let el: DebugElement;
  let service: any;
  const products = [
    {
      _id: "61aac17272803d7f8338e6eb",
      name: "Furla crossbody mini-bag",
      price: 311.43,
      description: "Dimensions: Width: 17.5cm, Height: 14.5cm, Depth: 8.5cm, Strap: 55.5cm",
      imageUrl: "http://localhost:3000/images/1638580594690.jpeg",
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
      imageUrl: "http://localhost:3000/images/1637910031081.png",
      numOfStocks: 99,
      type: "pets",
      createdAt: "2021-11-26T07:00:31.143Z",
      __v: 0
    }
  ];

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('ViewProductService', {
      'loadProducts': null,
      'getProducts': of(products),
      'getCurrentUser': of(undefined)
    });
    const productListServiceSpy = jasmine.createSpyObj('ProductListService', {
      'getCurrentUser': of(undefined),
      'getUserCart': of(undefined),
      'addToCart': null,
      'deleteProduct': null
    });
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        ProductListModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ ViewProductsComponent ],
      providers: [
        { provide: ViewProductService, useValue: serviceSpy },
        { provide: ProductListService, useValue: productListServiceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ViewProductsComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      service = TestBed.inject(ViewProductService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products when products is given', () => {
    const productList = el.queryAll(By.css('app-product-list'));
    const productTiles = el.queryAll(By.css('mat-grid-tile'));
    expect(productList.length).toEqual(1);
    expect(productTiles.length).toEqual(2);
  });
});
