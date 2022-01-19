import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { HeaderService } from './components/header/header.service';
import { NewProductDialogModule } from './components/new-product-dialog/new-product-dialog.module';
import { ProductListModule } from './components/product-list/product-list.module';
import { ShowCaseModule } from './components/show-case/show-case.module';
import { ViewProductDetailModule } from './components/view-product-detail/view-product-detail.module';

describe('AppComponent', () => {
  const headerServiceSpy = jasmine.createSpyObj('HeaderService', {
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
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeaderModule,
        FooterModule,
        MatSnackBarModule,
        NewProductDialogModule,
        ProductListModule,
        ShowCaseModule,
        ViewProductDetailModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: HeaderService, useValue: headerServiceSpy }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bucket'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bucket');
  });
});
