import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ViewProductDetailRoutingModule } from "./view-product-detail-routing.module";
import { ViewProductDetailComponent } from "./view-product-detail.component";

@NgModule({
  declarations: [
    ViewProductDetailComponent
  ],
  imports: [
    CommonModule,
    ViewProductDetailRoutingModule
  ],
  exports: [
    ViewProductDetailComponent
  ],
  providers: []
})
export class ViewProductDetailModule { }
