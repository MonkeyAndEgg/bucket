import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ViewProductDetailComponent } from './view-product-detail.component';
import { ViewProductDetailService } from './view-product-detail.service';

describe('ViewProductDetailComponent', () => {
  let component: ViewProductDetailComponent;
  let fixture: ComponentFixture<ViewProductDetailComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ViewProductDetailService', {
      'loadProductById': null,
      'getSelectedProduct': of(undefined),
      'getUserCart': of(undefined),
      'addToCart': null
    });
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ViewProductDetailComponent ],
      providers: [
        { provide: ViewProductDetailService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
