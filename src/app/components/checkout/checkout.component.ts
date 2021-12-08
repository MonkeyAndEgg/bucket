import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { calculateProductTotal } from '../common/calculate-product-total';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  destroySubscription$ = new Subject();
  cart: Cart | undefined;
  total = 0;
  sameAddress = true;
  shippingForm = new FormGroup({
    address: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('',[
      Validators.required
    ]),
    state: new FormControl('', [
      Validators.required
    ]),
    postCode: new FormControl('', [
      Validators.required
    ])
  });

  billingForm = new FormGroup({
    address: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('',[
      Validators.required
    ]),
    state: new FormControl('', [
      Validators.required
    ]),
    postCode: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private service: CheckoutService) { }

  ngOnInit(): void {
    this.service.getUserCart().pipe(takeUntil(
      this.destroySubscription$
    )).subscribe((cart: Cart | undefined) => {
      this.cart = cart;
      if (this.cart) {
        this.total = calculateProductTotal(this.cart?.products);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onClickCheckout(): void {
    if (this.cart && this.cart._id) {
      this.service.processPayment(this.cart._id, this.total);
    }
  }
}