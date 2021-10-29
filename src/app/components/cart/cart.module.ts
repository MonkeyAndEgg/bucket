import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatButtonModule
  ],
  exports: [
    CartComponent
  ],
  providers: []
})
export class CartModule { }
