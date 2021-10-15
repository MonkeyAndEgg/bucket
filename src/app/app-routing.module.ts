import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AUTH_OPTIONS } from './constants/header.constants';

const routes: Routes = [
  { path: 'signin', component: AuthComponent, data: { page: AUTH_OPTIONS.SIGN_IN }},
  { path: 'signup', component: AuthComponent, data: { page: AUTH_OPTIONS.SIGN_UP }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
