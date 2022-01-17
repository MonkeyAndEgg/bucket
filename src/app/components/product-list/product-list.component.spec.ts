import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductListService } from './product-list.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let service: any;
  let el: DebugElement;
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
    const serviceSpy = jasmine.createSpyObj('ProductListService', {
      'getCurrentUser': of(undefined),
      'getUserCart': of(undefined),
      'addToCart': null,
      'deleteProduct': null
    });
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [ ProductListComponent ],
      providers: [
        { provide: ProductListService, useValue: serviceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      service = TestBed.inject(ProductListService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the input products as the list', () => {
    spyOn(component, 'onAddToCart');
    component.products = products;
    fixture.detectChanges();
    const productItems = el.queryAll(By.css('mat-grid-tile'));
    expect(productItems.length).toEqual(2);
    const productLabel = el.queryAll(By.css('mat-grid-tile label'))[0];
    expect(productLabel.nativeElement.textContent).toContain('Furla crossbody mini-bag');
    const productPrice = el.queryAll(By.css('mat-card-actions label'))[0];
    expect(productPrice.nativeElement.textContent).toContain('311.43');
    const icons = el.queryAll(By.css('.material-icons'));
    expect(icons.length).toEqual(4);
    icons[1].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();
    expect(component.onAddToCart).toHaveBeenCalled();
  });
});
