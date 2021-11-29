import { NgModule } from "@angular/core";
import { ProductListModule } from "../product-list/product-list.module";
import { ShowCaseModule } from "../show-case/show-case.module";
import { LandingComponent } from "./landing.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from "@angular/router";
import { LandingRoutingModule } from "./landing-routing.module";

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    LandingRoutingModule,
    MatButtonModule,
    ProductListModule,
    RouterModule,
    ShowCaseModule
  ],
  exports: [
    LandingComponent
  ],
  providers: []
})
export class LandingModule { }
