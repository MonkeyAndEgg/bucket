import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ViewProductDetailService } from './view-product-detail.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.css']
})
export class ViewProductDetailComponent implements OnInit, OnDestroy {
  destroySubscription$ = new Subject();
  numOfProductsToAdd = 1;

  product: Product | undefined;
  cart: Cart | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: ViewProductDetailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroySubscription$)).subscribe(params => {
      this.service.loadProductById(params.id);
    });

    this.service.getSelectedProduct()
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe((product: Product | undefined) => {
        this.product = product;
      });

    this.service.getUserCart()
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe((cart: Cart | undefined) => {
        this.cart = cart;
      });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onAddToCart(): void {
    if (this.cart) {
      if (this.product && this.product._id) {
        this.service.addToCart(this.product._id, this.numOfProductsToAdd, this.cart);
      } else {
        console.error('product id is not defined, cannot add to cart');
      }
    } else {
      this.router.navigate(['/signin']);
    }
  }

  decrementProducts(): void {
    if (this.numOfProductsToAdd > 1) {
      this.numOfProductsToAdd -= 1;
    }
  }

  incrementProducts(): void {
    if (this.product && this.product.numOfStocks > this.numOfProductsToAdd && 99 > this.numOfProductsToAdd) {
      this.numOfProductsToAdd += 1;
    }
  }
}
