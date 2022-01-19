import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewSearchComponent } from "./view-search.component";

const routes: Routes = [
  { path: '', component: ViewSearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewSearchRoutingModule {}
