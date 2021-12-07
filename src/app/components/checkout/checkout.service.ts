import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart";
import { Payment } from "src/app/models/payment";
import { selectCurrentCart } from "src/app/store/order/order.selector";
import { processPayment } from "src/app/store/payment/payment.actions";
import { selectPayment } from "src/app/store/payment/payment.selector";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private store: Store) {}

  processPayment(cartId: string, amount: number): void {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_ntBR2ZUDCrXSAsqAV3qUJPvZ00JjuqM0to',
      token: (stripeToken: any) => {
        console.log('token is:', stripeToken);
        const paymentRequest = { token: stripeToken, cartId };
        this.store.dispatch(processPayment({ paymentRequest }));
      }
    });

    // round the amount since *100 gives decimal number
    const roundedAmout = Math.round(amount * 100)
    handler.open({
      name: 'Checkout',
      amount: roundedAmout
    })
  }

  getUserCart(): Observable<Cart | undefined> {
    return this.store.select(selectCurrentCart);
  }

  getCompletedPayment(): Observable<Payment> {
    return this.store.select(selectPayment);
  }
}
