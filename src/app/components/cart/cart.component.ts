import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart/cart';
import { CartProductData } from 'src/app/models/cart/cart-product-data';
import { Payment } from 'src/app/models/payment';
import { RoundToTwoDecimals } from 'src/app/components/common/common-price-utils';
import { CartService } from './cart.service';
import { ProductStatus } from 'src/app/constants/product-status.constants';
import { calculateProductTotal } from '../common/calculate-product-total';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  destroySubscription$ = new Subject();
  cart: Cart | undefined;
  total = 0;
  products: CartProductData[] = [];
  purchasedProducts: CartProductData[] = [];

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getUserCart().pipe(takeUntil(
      this.destroySubscription$
    )).subscribe((cart: Cart | undefined) => {
      this.cart = cart;
      if (this.cart) {
        this.purchasedProducts = this.generateProductData(true);
        this.products = this.generateProductData(false);
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

  onClickRemove(productData: CartProductData): void {
    if (this.cart) {
      this.service.updateCart({ product: productData.product, quantity: 0 }, this.cart);
    }
  }

  decrementQuantity(productData: CartProductData): void {
    let updatedQuantity = productData.quantity;
    if (this.cart && productData.quantity > 0) {
      updatedQuantity -= 1;
      this.service.updateCart({ product: productData.product, quantity: updatedQuantity }, this.cart);
    }
  }

  incrementQuantity(productData: CartProductData): void {
    let updatedQuantity = productData.quantity;
    if (this.cart && productData.quantity < productData.product.numOfStocks) {
      updatedQuantity += 1;
      this.service.updateCart({ product: productData.product, quantity: updatedQuantity }, this.cart);
    }
  }

  private generateProductData(purchased: boolean): CartProductData[] {
    let products = this.cart!.products;
    if (purchased) {
      products = products.filter(productData => productData.status !== ProductStatus.WAIT_TO_BUY);
    } else {
      products = products.filter(productData => productData.status === ProductStatus.WAIT_TO_BUY)
    }
    products = products.map(productData => {
      return {
        ...productData,
        totalPrice: RoundToTwoDecimals(productData.product.price * productData.quantity)
      };
    });
    return products;
  }
}
