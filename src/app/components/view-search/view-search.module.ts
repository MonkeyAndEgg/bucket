import { NgModule } from "@angular/core";
import { ProductListModule } from "../product-list/product-list.module";
import { ViewSearchComponent } from "./view-search.component";

@NgModule({
  declarations: [
    ViewSearchComponent
  ],
  imports: [
    ProductListModule
  ],
  exports: [
    ViewSearchComponent
  ],
  providers: []
})
export class ViewSearchModule { }
