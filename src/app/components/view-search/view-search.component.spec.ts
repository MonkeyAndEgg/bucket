import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductListModule } from '../product-list/product-list.module';
import { ProductListService } from '../product-list/product-list.service';
import { ViewSearchRoutingModule } from './view-search-routing.module';
import { ViewSearchComponent } from './view-search.component';
import { ViewSearchService } from './view-search.service';

describe('ViewSearchComponent', () => {
  let component: ViewSearchComponent;
  let fixture: ComponentFixture<ViewSearchComponent>;

  beforeEach(async () => {
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
    await TestBed.configureTestingModule({
      imports: [
        ProductListModule,
        ViewSearchRoutingModule,
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
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
