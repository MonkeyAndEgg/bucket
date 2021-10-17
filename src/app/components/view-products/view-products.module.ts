import { NgModule } from "@angular/core";
import { ProductListModule } from "../product-list/product-list.module";
import { ViewProductsComponent } from "./view-products.component";

@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    ProductListModule
  ],
  exports: [
    ViewProductsComponent
  ],
  providers: []
})
export class ViewProductsModule { }
