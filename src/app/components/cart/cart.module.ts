import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    CartComponent
  ],
  providers: []
})
export class CartModule { }
