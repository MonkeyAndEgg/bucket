import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewProductsComponent } from "./view-products.component";

const routes: Routes = [
  { path: '', component: ViewProductsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewProductsRoutingModule {}
