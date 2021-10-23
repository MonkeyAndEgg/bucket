import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule
  ],
  exports: [
    ProductListComponent
  ],
  providers: []
})
export class ProductListModule { }
