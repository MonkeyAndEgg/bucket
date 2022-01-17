import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductListModule } from '../product-list/product-list.module';
import { ProductListService } from '../product-list/product-list.service';
import { ViewSearchComponent } from './view-search.component';
import { ViewSearchService } from './view-search.service';

describe('ViewSearchComponent', () => {
  let component: ViewSearchComponent;
  let fixture: ComponentFixture<ViewSearchComponent>;
  let el: DebugElement;
  let service: any;
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
    const serviceSpy = jasmine.createSpyObj('ViewSearchService', {
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
        ProductListModule,
        RouterTestingModule
      ],
      declarations: [ ViewSearchComponent ],
      providers: [
        { provide: ViewSearchService, useValue: serviceSpy },
        { provide: ProductListService, useValue: productListServiceSpy },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({keyword: ''})
          }
        }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ViewSearchComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      service = TestBed.inject(ViewSearchService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display with search label and products', () => {
    service.getProducts.and.returnValue(of(products));
    fixture.detectChanges();
    const message = el.queryAll(By.css('.container span'))[0];
    expect(message.nativeElement.textContent).toContain('Search Results with keyword');
    const productTiles = el.queryAll(By.css('mat-grid-tile'));
    expect(productTiles.length).toEqual(2);
  });
});
