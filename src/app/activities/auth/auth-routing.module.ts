import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserOptions } from "src/app/constants/header.constants";
import { AuthComponent } from "./auth.component";

export const routes: Routes = [
  { path: 'signin', component: AuthComponent, data: { page: UserOptions.SIGN_IN } },
  { path: 'signup', component: AuthComponent, data: { page: UserOptions.SIGN_UP } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
