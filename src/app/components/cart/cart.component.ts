import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  destroySubscription$ = new Subject();
  cart = {} as Cart;
  total = 0;

  constructor(private route: ActivatedRoute, private service: CartService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroySubscription$))
      .subscribe(params => {
        this.service.loadUserCart(params.id);
      }
    );

    this.service.getUserCart().pipe(takeUntil(
      this.destroySubscription$
    )).subscribe((cart: Cart) => {
      this.cart = cart;
      this.calculateTotal();
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onCheckout(): void {
    // TODO payment
  }

  private calculateTotal(): void {
    this.total = 0;
    if (this.cart.products && this.cart.products.length > 0) {
      for (const item of this.cart.products) {
        if (item?.product?.price && item?.quantity) {
          this.total += item.product.price * item.quantity;
        }
      }
    }
  }
}
