import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { AUTH_OPTIONS } from './constants/header.constants';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'signin', component: AuthComponent, data: { page: AUTH_OPTIONS.SIGN_IN }},
  { path: 'signup', component: AuthComponent, data: { page: AUTH_OPTIONS.SIGN_UP }},
  { path: 'view-products', component: ViewProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
