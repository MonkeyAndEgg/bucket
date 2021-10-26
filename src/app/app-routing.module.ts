import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './components/cart/cart.component';
import { LandingComponent } from './components/landing/landing.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { USER_OPTIONS } from './constants/header.constants';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'cart', component: CartComponent },
  { path: 'signin', component: AuthComponent, data: { page: USER_OPTIONS.SIGN_IN }},
  { path: 'signup', component: AuthComponent, data: { page: USER_OPTIONS.SIGN_UP }},
  { path: 'view-products', component: ViewProductsComponent },
  { path: 'view-detail/:id', component: ViewProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
