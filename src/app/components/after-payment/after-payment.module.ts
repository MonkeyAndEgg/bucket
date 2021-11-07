import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AfterPaymentComponent } from "./after-payment.component";


@NgModule({
  declarations: [
    AfterPaymentComponent
  ],
  imports: [
    AppRoutingModule,
    MatButtonModule
  ],
  exports: [
    AfterPaymentComponent
  ],
  providers: []
})
export class AfterPaymentModule { }
