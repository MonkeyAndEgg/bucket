import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { catchError, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";
import { errorHandler } from "src/app/components/common/error-handler";
import { ProductStatus } from "src/app/constants/product-status.constants";
import { Cart, CartRequest } from "src/app/models/cart/cart";
import { CartProductRequestData } from "src/app/models/cart/cart-product-request-data";
import { Payment, PaymentRequestPayload } from "src/app/models/payment";
import { addToCart } from "../order/order.actions";
import { selectCurrentCart } from "../order/order.selector";
import { processPayment, processPaymentComplete } from "./payment.actions";
import { PaymentDataService } from "./payment.data.service";

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private store: Store,
              private snackBar: MatSnackBar,
              private paymentDataService: PaymentDataService) {}

  processPayment$ = createEffect(() => this.actions$.pipe(
    ofType(processPayment),
    mergeMap((payload: { paymentRequest: PaymentRequestPayload }) => this.paymentDataService.processPayment(payload.paymentRequest)
    .pipe(
      withLatestFrom(this.store.select(selectCurrentCart)),
      switchMap(([paymentRes, cart]: [{ payment: Payment }, Cart | undefined]) => {
        if (cart) {
          // navigate to after payment page
          this.router.navigate(['/payment-complete']);
          // clean the current cart for the user
          const updatedCart = {...cart};
          const actions = [];
          actions.push(processPaymentComplete({ payment: paymentRes.payment }));

          // filtered out the purchased products and then map them as request data
          const updateProductDataList = updatedCart.products
            .filter(productData => productData.status !== ProductStatus.WAIT_TO_BUY)
            .map(productData => {
              return {
                productId: productData.product._id,
                quantity: productData.quantity,
                status: productData.status
              } as CartProductRequestData;
            }
          );
          // find if the purchased items already have the same product. If yes, then add the cart product's quantity
          // to the same product inside purchased group. If no, push it as new object to the pruchased group
          const productsInCart = updatedCart.products.filter(productData => productData.status === ProductStatus.WAIT_TO_BUY);
          productsInCart.forEach(productDataInCart => {
            const index = updateProductDataList.findIndex(productData => productDataInCart.product._id === productData.productId);
            if (index > -1) {
              updateProductDataList[index].quantity += productDataInCart.quantity;
            } else {
              updateProductDataList.push({
                productId: productDataInCart.product._id,
                quantity: productDataInCart.quantity,
                status: ProductStatus.WAIT_TO_DELIVER
              } as CartProductRequestData);
            }
          });
          const cartPayload = {
            userId: cart.userId,
            productDataList: updateProductDataList
          } as CartRequest;
          actions.push(addToCart({ cart: cartPayload, cartId: cart._id }));

          return actions;
        }
        const errorResponse = new HttpErrorResponse({ error: { message: 'The cart data is undefined, the payment is failed' }});
        errorHandler(this.snackBar, errorResponse);
        return EMPTY;
      }),
      catchError((err) => {
        errorHandler(this.snackBar, err);
        return EMPTY;
      })
    ))
  ));
}
