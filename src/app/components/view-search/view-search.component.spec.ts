import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
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
    await TestBed.configureTestingModule({
      declarations: [ ViewSearchComponent ],
      providers: [
        { provide: ViewSearchService, useValue: serviceSpy },
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
