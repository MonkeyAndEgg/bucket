import { NgModule } from "@angular/core";
import { ProductListModule } from "../product-list/product-list.module";
import { ViewProductsComponent } from "./view-products.component";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from "@angular/forms";
import { ViewProductsRoutingModule } from "./view-products-routing.module";

@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    ProductListModule,
    ViewProductsRoutingModule
  ],
  exports: [
    ViewProductsComponent
  ],
  providers: []
})
export class ViewProductsModule { }
