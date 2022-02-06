import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './activities/auth/auth.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./activities/landing/landing.module').then(m => m.LandingModule)},
  { path: 'cart', loadChildren: () => import('./activities/cart/cart.module').then(m => m.CartModule), canActivate: [AuthGuard] },
  { path: 'checkout', loadChildren: () => import('./activities/checkout/checkout.module').then(m => m.CheckoutModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./activities/auth/auth.module').then(m => m.AuthModule)},
  { path: 'view-products', loadChildren: () => import('./activities/view-products/view-products.module').then(m => m.ViewProductsModule) },
  { path: 'view-product/:id', loadChildren: () => import('./activities/view-product-detail/view-product-detail.module').then(m => m.ViewProductDetailModule) },
  { path: 'view-admin', loadChildren: () => import('./activities/view-admin/view-admin.module').then(m => m.ViewAdminModule) },
  { path: 'payment-complete', loadChildren: () => import('./activities/after-payment/after-payment.module').then(m => m.AfterPaymentModule) },
  { path: 'view-search', loadChildren: () => import('./activities/view-search/view-search.module').then(m => m.ViewSearchModule) },
  { path: 'reset-password/:userId', loadChildren: () => import('./activities/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'forget-password', loadChildren: () => import('./activities/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'view-order/:id', loadChildren: () => import('./activities/view-order-detail/view-order-detail.module').then(m => m.ViewOrderDetailModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
