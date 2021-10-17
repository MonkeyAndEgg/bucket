import { NgModule } from "@angular/core";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ProductListModule } from "../product-list/product-list.module";
import { ShowCaseModule } from "../show-case/show-case.module";
import { LandingComponent } from "./landing.component";

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    AppRoutingModule,
    ProductListModule,
    ShowCaseModule
  ],
  exports: [
    LandingComponent
  ],
  providers: []
})
export class LandingModule { }
