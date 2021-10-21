import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthEffects } from "./auth/auth.effects";

import * as fromAuth from './auth/auth.reducer';
import { ProductEffects } from "./product/product.effects";
import * as fromProduct from './product/product.reducer';

@NgModule({
  declarations: [
  ],
  imports: [
    StoreModule.forRoot({
      user: fromAuth.reducer,
      product: fromProduct.reducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProductEffects
    ]),
    HttpClientModule
  ],
  exports: [
  ],
  providers: []
})
export class AppStoreModule { }
