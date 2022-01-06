import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('HeaderService', {
      'loadUser': null,
      'loadUserCart': null,
      'getCurrentUser': of(undefined),
      'getUserCart': of(undefined),
      'getToken': of(''),
      'getExpiration': of(0),
      'signOut': null,
      'getStorageTokenData': of(undefined),
      'initAuthTimer': null,
      'verifyUserAuth': null
    });
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: HeaderService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
