import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AfterPaymentComponent } from "./after-payment.component";

const routes: Routes = [
  { path: '', component: AfterPaymentComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AfterPaymentRoutingModule {}
