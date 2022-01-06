import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetPasswordComponent } from './forget-password.component';
import { ForgetPasswordService } from './forget-password.service';

describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ForgetPasswordService', ['requestPasswordReset']);
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordComponent ],
      providers: [
        { provide: ForgetPasswordService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
