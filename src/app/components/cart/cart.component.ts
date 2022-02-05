import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { Payment } from 'src/app/models/payment';
import { RoundToTwoDecimals } from 'src/app/common/common-price-utils';
import { CartService } from './cart.service';
import { calculateProductTotal } from '../../common/calculate-product-total';
import { ProductData } from 'src/app/models/product-data';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  destroySubscription$ = new Subject();
  cart: Cart | undefined;
  total = 0;
  products: ProductData[] = [];
  orders: Order[] = [];

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getUserCart().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((cart: Cart | undefined) => {
      this.cart = cart;
      if (this.cart) {
        this.products = this.cart.products.map(productData => {
          return {
            ...productData,
            totalPrice: RoundToTwoDecimals(productData.product.price * productData.quantity)
          };
        });
        this.total = calculateProductTotal(this.cart.products);
      }
    });

    this.service.getUserOrders().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((orders: Order[]) => {
      this.orders = orders;
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

  onClickRemove(productData: ProductData): void {
    if (this.cart) {
      this.service.updateCart({ product: productData.product, quantity: 0 }, this.cart);
    }
  }

  decrementQuantity(productData: ProductData): void {
    let updatedQuantity = productData.quantity;
    if (this.cart && productData.quantity > 0) {
      updatedQuantity -= 1;
      this.service.updateCart({ product: productData.product, quantity: updatedQuantity }, this.cart);
    }
  }

  incrementQuantity(productData: ProductData): void {
    let updatedQuantity = productData.quantity;
    if (this.cart && productData.quantity < productData.product.numOfStocks) {
      updatedQuantity += 1;
      this.service.updateCart({ product: productData.product, quantity: updatedQuantity }, this.cart);
    }
  }
}
