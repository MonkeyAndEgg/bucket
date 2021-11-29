import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewProductDetailComponent } from "./view-product-detail.component";

const routes: Routes = [
  { path: '', component: ViewProductDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewProductDetailRoutingModule {}
