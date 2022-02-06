import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewAdminComponent } from './view-admin.component';

describe('ViewAdminComponent', () => {
  let component: ViewAdminComponent;
  let fixture: ComponentFixture<ViewAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdminComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ViewAdminComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
