import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgetPasswordComponent } from "./forget-password.component";

const routes: Routes = [
  { path: '', component: ForgetPasswordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule {}
