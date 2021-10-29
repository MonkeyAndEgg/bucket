import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import * as fromAuth from './auth/auth.reducer';
import * as fromOrder from './order/order.reducer';
import * as fromProduct from './product/product.reducer';

import { AuthEffects } from "./auth/auth.effects";
import { OrderEffects } from "./order/order.effects";
import { ProductEffects } from "./product/product.effects";

@NgModule({
  declarations: [
  ],
  imports: [
    StoreModule.forRoot({
      user: fromAuth.reducer,
      order: fromOrder.reducer,
      product: fromProduct.reducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      OrderEffects,
      ProductEffects
    ]),
    HttpClientModule
  ],
  exports: [
  ],
  providers: []
})
export class AppStoreModule { }
