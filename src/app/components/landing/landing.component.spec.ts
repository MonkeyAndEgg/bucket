import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LandingComponent } from './landing.component';
import { LandingService } from './landing.service';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('LandingService', {
      'getProducts': of([]),
      'loadProducts': null
    });
    await TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      providers: [
        { provide: LandingService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
