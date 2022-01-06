import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { ViewProductService } from './view-product.service';
import { ViewProductsComponent } from './view-products.component';

describe('ViewProductsComponent', () => {
  let component: ViewProductsComponent;
  let fixture: ComponentFixture<ViewProductsComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ViewProductService', {
      'loadProducts': null,
      'getProducts': of([]),
      'getCurrentUser': of(undefined)
    });
    await TestBed.configureTestingModule({
      imports: [ MatMenuModule ],
      declarations: [ ViewProductsComponent ],
      providers: [
        { provide: ViewProductService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
