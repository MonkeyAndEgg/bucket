import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { AfterPaymentRoutingModule } from "./after-payment-routing.module";
import { AfterPaymentComponent } from "./after-payment.component";


@NgModule({
  declarations: [
    AfterPaymentComponent
  ],
  imports: [
    AfterPaymentRoutingModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    AfterPaymentComponent
  ],
  providers: []
})
export class AfterPaymentModule { }
