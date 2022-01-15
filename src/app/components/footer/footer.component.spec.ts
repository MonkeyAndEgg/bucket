import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule
      ],
      declarations: [ FooterComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FooterComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 1 mat toolbar', () => {
    const toolbar = el.queryAll(By.css('mat-toolbar'));
    expect(toolbar.length).toEqual(1);
  });
});
