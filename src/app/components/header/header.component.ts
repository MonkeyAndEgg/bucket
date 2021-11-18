import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { USER_OPTIONS } from 'src/app/constants/header.constants';
import { User } from 'src/app/models/user';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth = false;
  USER_OPTIONS = USER_OPTIONS;
  destroySubscription$ = new Subject();
  userId: string | undefined;
  isAdmin = false;
  displaySearchBar = false;
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private service: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.service.verifyUserAuth();
    this.service.getCurrentUser()
    .pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((user: User | undefined) => {
      if (user) {
        this.userId = user.id;
        this.isAdmin = user.isAdmin ? user.isAdmin : false;
        this.service.loadUserCart(user.id);
      }
    });

    combineLatest([
      this.service.getIsAuth(),
      this.service.getToken(),
      this.service.getExpiration()
    ]).pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe(([isAuth, token, expiresIn]: [boolean, string, number]) => {
      this.isAuth = isAuth;
      if (token !== '' && expiresIn > 0) {
        this.service.initAuthTimer(expiresIn);
        const expiration = new Date().getTime() + expiresIn * 1000;
        this.service.saveStorageData(token, new Date(expiration));
        this.service.loadUser();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onSignOut(): void {
    this.service.signOut();
    this.userId = undefined;
  }

  onToggleSearch(): void {
    this.displaySearchBar = !this.displaySearchBar;
  }

  onSearch(): void {
    this.router.navigate(['/view-search'], {
      queryParams: { keyword: this.searchForm.controls.search.value }
    });
  }

  onSearchBlur(): void {
    this.onToggleSearch();
  }
}
