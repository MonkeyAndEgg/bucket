import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthEffects } from "./auth/auth.effects";

import * as fromAuth from './auth/auth.reducer';

@NgModule({
  declarations: [
  ],
  imports: [
    StoreModule.forRoot({ user: fromAuth.reducer }),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule
  ],
  exports: [
  ],
  providers: []
})
export class AppStoreModule { }
