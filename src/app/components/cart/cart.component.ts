import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { Payment } from 'src/app/models/payment';
import { calculateProductTotal } from '../common/calculate-product-total';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  destroySubscription$ = new Subject();
  cart: Cart | undefined;
  total = 0;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getUserCart().pipe(takeUntil(
      this.destroySubscription$
    )).subscribe((cart: Cart | undefined) => {
      this.cart = cart;
      if (this.cart) {
        this.total = calculateProductTotal(this.cart.products);
      }
    });

    this.service.getCompletedPayment().pipe(takeUntil(
      this.destroySubscription$
    )).subscribe((payment: Payment) => {
      // TODO
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onClickRemove(productId: string | undefined): void {
    if (productId && this.cart) {
      this.service.addToCart(productId, this.cart);
    }
  }
}
