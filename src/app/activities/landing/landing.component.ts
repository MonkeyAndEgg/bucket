import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { LandingService } from './landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  MAX_PRODUCT_NUM = 6; // set the number of products to be displayed under new products section

  destroySubscription$ = new Subject();
  products: Product[] = [];

  constructor(private service: LandingService) { }

  ngOnInit(): void {
    this.service.loadProducts();
    this.service.getProducts().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((products: Product[]) => {
      this.products = products.slice(0, this.MAX_PRODUCT_NUM);
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }
}
