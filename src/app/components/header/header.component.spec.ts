import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  let headerService: any;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('HeaderService', {
      'loadUser': null,
      'loadUserCart': null,
      'loadUserOrders': null,
      'getCurrentUser': of(undefined),
      'getUserCart': of(undefined),
      'getToken': of(''),
      'getExpiration': of(0),
      'signOut': null,
      'getStorageTokenData': of(undefined),
      'initAuthTimer': null,
      'verifyUserAuth': null
    });
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        MatToolbarModule,
        MatTooltipModule,
        NoopAnimationsModule,
        MatBadgeModule,
        ReactiveFormsModule
      ],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: HeaderService, useValue: serviceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      headerService = TestBed.inject(HeaderService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header with proper labels when user is not authenticated', () => {
    fixture.detectChanges();
    const title = el.queryAll(By.css('.title'));
    expect(title.length).toEqual(1);
    expect(title[0].nativeElement.textContent).toEqual('Bucket');
    const options = el.queryAll(By.css('.options .material-icons'));
    expect(options.length).toEqual(3);
    expect(options[0].nativeElement.textContent).toContain('search');
    expect(options[1].nativeElement.textContent).toContain('person_add');
    expect(options[2].nativeElement.textContent).toContain('login');
  });

  it('should display header with proper labels when user is authenticated', () => {
    const user = {
      id: '12345',
      email: '12345@test.com',
      isAdmin: false
    };
    headerService.getCurrentUser.and.returnValue(of(user));
    fixture.detectChanges();
    const title = el.queryAll(By.css('.title'));
    expect(title.length).toEqual(1);
    expect(title[0].nativeElement.textContent).toEqual('Bucket');
    const options = el.queryAll(By.css('.options .material-icons'));
    expect(options.length).toEqual(3);
    expect(options[0].nativeElement.textContent).toContain('search');
    expect(options[1].nativeElement.textContent).toContain('shopping_cart');
    expect(options[2].nativeElement.textContent).toContain('logout');
  });

  it('should display header with proper labels when admin is authenticated', () => {
    const user = {
      id: '12345',
      email: '12345@test.com',
      isAdmin: true
    };
    headerService.getCurrentUser.and.returnValue(of(user));
    fixture.detectChanges();
    const title = el.queryAll(By.css('.title'));
    expect(title.length).toEqual(1);
    expect(title[0].nativeElement.textContent).toEqual('Bucket');
    const options = el.queryAll(By.css('.options .material-icons'));
    expect(options.length).toEqual(4);
    expect(options[0].nativeElement.textContent).toContain('search');
    expect(options[1].nativeElement.textContent).toContain('admin_panel_settings');
    expect(options[2].nativeElement.textContent).toContain('shopping_cart');
    expect(options[3].nativeElement.textContent).toContain('logout');
  });
});
