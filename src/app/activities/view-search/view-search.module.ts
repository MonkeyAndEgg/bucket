import { NgModule } from "@angular/core";
import { ProductListModule } from "../../components/product-list/product-list.module";
import { ViewSearchRoutingModule } from "./view-search-routing.module";
import { ViewSearchComponent } from "./view-search.component";

@NgModule({
  declarations: [
    ViewSearchComponent
  ],
  imports: [
    ProductListModule,
    ViewSearchRoutingModule
  ],
  exports: [
    ViewSearchComponent
  ],
  providers: []
})
export class ViewSearchModule { }
