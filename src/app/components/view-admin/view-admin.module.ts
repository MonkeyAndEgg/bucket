import { NgModule } from "@angular/core";
import { ViewAdminRoutingModule } from "./view-admin-routing.module";
import { ViewAdminComponent } from "./view-admin.component";


@NgModule({
  declarations: [
    ViewAdminComponent
  ],
  imports: [
    ViewAdminRoutingModule
  ],
  exports: [
    ViewAdminComponent
  ],
  providers: []
})
export class ViewAdminModule { }
