import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShowCaseComponent } from './show-case.component';

describe('ShowCaseComponent', () => {
  let component: ShowCaseComponent;
  let fixture: ComponentFixture<ShowCaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CarouselModule,
        CommonModule,
        NoopAnimationsModule
      ],
      declarations: [ ShowCaseComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ShowCaseComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
