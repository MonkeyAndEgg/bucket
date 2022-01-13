import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AfterPaymentComponent } from './after-payment.component';

describe('AfterPaymentComponent', () => {
  let component: AfterPaymentComponent;
  let fixture: ComponentFixture<AfterPaymentComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        RouterTestingModule
      ],
      declarations: [ AfterPaymentComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AfterPaymentComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should display with image and back home button', () => {
    const img = el.queryAll(By.css('img'));
    expect(img.length).toBe(1);
    const messages = el.queryAll(By.css('span'));
    expect(messages[0].nativeElement.textContent).toContain('Thank You for Your Purchase!');
    expect(messages[1].nativeElement.textContent).toContain('Your Payment was successful and your order is complete.');
    const button = el.queryAll(By.css('button'))[0];
    expect(button.nativeElement.textContent).toContain('Back To Home');
  });
});
