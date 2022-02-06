import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ViewOrderDetailComponent } from './view-order-detail.component';
import { ViewOrderDetailService } from './view-order-detail.service';

describe('ViewOrderDetailComponent', () => {
  let component: ViewOrderDetailComponent;
  let fixture: ComponentFixture<ViewOrderDetailComponent>;
  let el: DebugElement;
  let service: any;
  const mockedData = {
    address: {
      shipping: {
        address: "6363 Skaha Crescent",
        city: "Richmond",
        postCode: "V7C2R2",
        state: "BC"
      }
    },
    createdAt: "2022-02-06T00:28:35.736Z",
    products: [{
      product: {
        name: "Play Station 5"
      },
      quantity: 3
    }],
    status: "Wait To Deliver",
    total: 1799.97,
    userId: "61b980d2e1a9090cfdccc493"
  }

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('ViewOrderDetailService', {
      'loadOrderById': null,
      'getSelectedOrder': of(mockedData)
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
      el = fixture.debugElement;
      service = TestBed.inject(ViewOrderDetailService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper labels with values', () => {
    const labels = el.queryAll(By.css('.column-field label'));
    expect(labels.length).toBe(4);
    expect(labels[0].nativeElement.textContent).toContain('Shipping Address');
    expect(labels[1].nativeElement.textContent).toContain('Order Date');
    expect(labels[2].nativeElement.textContent).toContain('Order Items');
    expect(labels[3].nativeElement.textContent).toContain('Order Summary');

    const fieldValues = el.queryAll(By.css('.column-field span'));
    expect(fieldValues.length).toBe(7);
    expect(fieldValues[0].nativeElement.textContent).toContain('6363 Skaha Crescent');
    expect(fieldValues[1].nativeElement.textContent).toContain('Richmond');
    expect(fieldValues[2].nativeElement.textContent).toContain('BC');
    expect(fieldValues[3].nativeElement.textContent).toContain('V7C2R2');
    expect(fieldValues[4].nativeElement.textContent).toContain('February');
    expect(fieldValues[5].nativeElement.textContent).toContain('Play Station 5 * (3)');
    expect(fieldValues[6].nativeElement.textContent).toContain('$1799.97');
  });
});
