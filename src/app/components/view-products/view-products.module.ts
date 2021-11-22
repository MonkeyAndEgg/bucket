import { NgModule } from "@angular/core";
import { ProductListModule } from "../product-list/product-list.module";
import { ViewProductsComponent } from "./view-products.component";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    ProductListModule
  ],
  exports: [
    ViewProductsComponent
  ],
  providers: []
})
export class ViewProductsModule { }
