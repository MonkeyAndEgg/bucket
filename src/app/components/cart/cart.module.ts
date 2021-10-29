import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    CartComponent
  ],
  providers: []
})
export class CartModule { }
