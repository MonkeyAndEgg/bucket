import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { HeaderModule } from './components/header/header.module';
import { LandingModule } from './components/landing/landing.module';
import { ProductListModule } from './components/product-list/product-list.module';
import { ShowCaseModule } from './components/show-case/show-case.module';
import { AppStoreModule } from './store/store.module';
import { ViewProductsModule } from './components/view-products/view-products.module';
import { ViewProductDetailModule } from './components/view-product-detail/view-product-detail.module';
import { NewProductDialogModule } from './components/new-product-dialog/new-product-dialog.module';
import { CartModule } from './components/cart/cart.module';
import { AfterPaymentModule } from './components/after-payment/after-payment.module';
import { FooterModule } from './components/footer/footer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AfterPaymentModule,
    AppRoutingModule,
    AppStoreModule,
    BrowserAnimationsModule,
    CartModule,
    FooterModule,
    HeaderModule,
    LandingModule,
    NewProductDialogModule,
    ProductListModule,
    ShowCaseModule,
    ViewProductDetailModule,
    ViewProductsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
