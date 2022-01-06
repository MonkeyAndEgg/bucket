import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductListService } from './product-list.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ProductListService', {
      'getCurrentUser': of(undefined),
      'getUserCart': of(undefined),
      'addToCart': null,
      'deleteProduct': null
    });
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ProductListComponent ],
      providers: [
        { provide: ProductListService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
