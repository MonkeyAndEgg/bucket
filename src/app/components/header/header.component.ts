import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AUTH_OPTIONS } from 'src/app/constants/header.constants';
import { User } from 'src/app/models/user';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth = false;
  AUTH_OPTIONS = AUTH_OPTIONS;
  destroySubscription$ = new Subject();

  constructor(private service: HeaderService) { }

  ngOnInit(): void {
    this.service.loadUser();
    this.service.getCurrentUser()
    .pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((user: User) => {
        // TODO
        // this.isAuth = user && user.email !== '' && user.id !== '';
        // this.service.updateAuthStatus(this.isAuth);
    });

    this.service.getIsAuth()
    .pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onSignOut(): void {
    this.service.signOut();
  }
}
