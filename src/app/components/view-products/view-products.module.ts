import { NgModule } from "@angular/core";
import { ProductListModule } from "../product-list/product-list.module";
import { ViewProductsComponent } from "./view-products.component";
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    MatButtonModule,
    ProductListModule
  ],
  exports: [
    ViewProductsComponent
  ],
  providers: []
})
export class ViewProductsModule { }
