import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewAdminComponent } from "./view-admin.component";

const routes: Routes = [
  { path: '', component: ViewAdminComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewAdminRoutingModule {}
