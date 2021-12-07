import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule)},
  { path: 'cart', loadChildren: () => import('./components/cart/cart.module').then(m => m.CartModule), canActivate: [AuthGuard] },
  { path: 'checkout', loadChildren: () => import('./components/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)},
  { path: 'view-products', loadChildren: () => import('./components/view-products/view-products.module').then(m => m.ViewProductsModule) },
  { path: 'view-detail/:id', loadChildren: () => import('./components/view-product-detail/view-product-detail.module').then(m => m.ViewProductDetailModule) },
  { path: 'view-admin', loadChildren: () => import('./components/view-admin/view-admin.module').then(m => m.ViewAdminModule) },
  { path: 'payment-complete', loadChildren: () => import('./components/after-payment/after-payment.module').then(m => m.AfterPaymentModule) },
  { path: 'view-search', loadChildren: () => import('./components/view-search/view-search.module').then(m => m.ViewSearchModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
