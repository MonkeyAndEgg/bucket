import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { HeaderModule } from './components/header/header.module';
import { ProductListModule } from './components/product-list/product-list.module';
import { ShowCaseModule } from './components/show-case/show-case.module';
import { AppStoreModule } from './store/store.module';
import { ViewProductDetailModule } from './components/view-product-detail/view-product-detail.module';
import { NewProductDialogModule } from './components/new-product-dialog/new-product-dialog.module';
import { FooterModule } from './components/footer/footer.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AppStoreModule,
    BrowserAnimationsModule,
    FooterModule,
    HeaderModule,
    MatSnackBarModule,
    NewProductDialogModule,
    ProductListModule,
    ShowCaseModule,
    ViewProductDetailModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
