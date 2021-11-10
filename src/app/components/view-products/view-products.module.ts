import { NgModule } from "@angular/core";
import { ProductListModule } from "../product-list/product-list.module";
import { ViewProductsComponent } from "./view-products.component";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ProductListModule
  ],
  exports: [
    ViewProductsComponent
  ],
  providers: []
})
export class ViewProductsModule { }
