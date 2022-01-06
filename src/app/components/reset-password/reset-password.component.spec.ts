import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LoadStatus } from 'src/app/constants/load-status.constants';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './reset-password.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ResetPasswordService', {
      'getLoadStatus': of(LoadStatus.NOT_LOADED),
      'setLoadStatus': null,
      'logoutUser': null,
      'resetPassword': null
    });
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      providers: [
        { provide: ResetPasswordService, useValue: serviceSpy },
        {
          provide: ActivatedRoute, useValue: {
            params: of({userId: '123456'})
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
