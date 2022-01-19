import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CartRoutingModule } from "./cart-routing.module";

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CartRoutingModule,
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    CartComponent
  ],
  providers: []
})
export class CartModule { }
