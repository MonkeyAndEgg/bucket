import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { USER_OPTIONS } from "src/app/constants/header.constants";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
  { path: 'signin', component: AuthComponent, data: { page: USER_OPTIONS.SIGN_IN } },
  { path: 'signup', component: AuthComponent, data: { page: USER_OPTIONS.SIGN_UP } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
