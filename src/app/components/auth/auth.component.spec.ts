import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { USER_OPTIONS } from 'src/app/constants/header.constants';
import { LoadStatus } from 'src/app/constants/load-status.constants';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: any;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('AuthService', {
      'getLoadStatus': of(LoadStatus.NOT_LOADED),
      'setLoadStatus': null,
      'submitAuth': null
    });
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AuthComponent
      ],
      providers: [
        { provide: AuthService, useValue: serviceSpy },
        {
          provide: ActivatedRoute, useValue: {
            data: of({page: USER_OPTIONS.SIGN_IN})
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
