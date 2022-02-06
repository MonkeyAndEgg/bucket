import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewOrderDetailComponent } from "./view-order-detail.component";

const routes: Routes = [
  { path: '', component: ViewOrderDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewOrderDetailRoutingModule {}
