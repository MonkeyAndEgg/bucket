import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from "src/app/app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { AuthModule } from "../auth/auth.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: []
})
export class HeaderModule { }
