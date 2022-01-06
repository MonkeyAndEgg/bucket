import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewProductDialogComponent } from './new-product-dialog.component';
import { NewProductDialogService } from './new-product-dialog.service';

describe('NewProductDialogComponent', () => {
  let component: NewProductDialogComponent;
  let fixture: ComponentFixture<NewProductDialogComponent>;
  let service: any;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('NewProductDialogService', ['createProuct']);
    await TestBed.configureTestingModule({
      declarations: [
        NewProductDialogComponent
      ],
      providers: [
        { provide: NewProductDialogService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NewProductDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
