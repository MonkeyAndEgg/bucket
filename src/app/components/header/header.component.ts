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
    ).subscribe(
      (user: User) => {
        // TODO
        console.log(user);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

}
