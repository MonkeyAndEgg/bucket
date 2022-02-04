import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ViewOrderDetailComponent } from './view-order-detail.component';
import { ViewOrderDetailService } from './view-order-detail.service';

describe('ViewOrderDetailComponent', () => {
  let component: ViewOrderDetailComponent;
  let fixture: ComponentFixture<ViewOrderDetailComponent>;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('ViewOrderDetailService', {
      'loadOrderById': null,
      'getSelectedProduct': of(undefined),
      'getSelectedOrder': of(undefined)
    });
    TestBed.configureTestingModule({
      declarations: [ ViewOrderDetailComponent ],
      imports: [
        CommonModule,
        RouterTestingModule,
        MatButtonModule,
        MatProgressBarModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ViewOrderDetailService, useValue: serviceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ViewOrderDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
