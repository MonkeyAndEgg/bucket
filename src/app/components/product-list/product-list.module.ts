import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    ProductListComponent
  ],
  providers: []
})
export class ProductListModule { }
