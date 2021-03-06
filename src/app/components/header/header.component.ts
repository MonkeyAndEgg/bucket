import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserOptions } from 'src/app/constants/header.constants';
import { Cart } from 'src/app/models/cart';
import { ProductData } from 'src/app/models/product-data';
import { User } from 'src/app/models/user';
import { saveStorageData } from '../../common/process-storage-data';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth = false;
  UserOptions = UserOptions;
  destroySubscription$ = new Subject();
  userId: string | undefined;
  isAdmin = false;
  displaySearchBar = false;
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  cartProductNumber = 0;
  matTooltipPosition: TooltipPosition = 'left';  // set to left by default

  constructor(private service: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.service.verifyUserAuth();
    this.service.getCurrentUser()
    .pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((user: User | undefined) => {
      if (user) {
        this.isAuth = true;
        this.userId = user.id;
        this.isAdmin = user.isAdmin ? user.isAdmin : false;
        this.service.loadUserCart(user.id);
      } else {
        this.isAuth = false;
        this.userId = undefined;
      }
    });

    combineLatest([
      this.service.getToken(),
      this.service.getExpiration()
    ]).pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe(([token, expiresIn]: [string, number]) => {
      if (token !== '' && expiresIn > 0) {
        this.service.initAuthTimer(expiresIn);
        const expiration = new Date().getTime() + expiresIn * 1000;
        saveStorageData(token, new Date(expiration));
        this.service.loadUser();
      }
    });

    this.service.getUserCart().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((cart: Cart | undefined) => {
      this.cartProductNumber = 0;
      if (cart) {
        cart.products.forEach((productData: ProductData) => {
          this.cartProductNumber += productData.quantity;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onSignOut(): void {
    this.service.signOut();
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
