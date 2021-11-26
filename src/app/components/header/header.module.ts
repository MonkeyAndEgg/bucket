import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from "src/app/app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { AuthModule } from "../auth/auth.module";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
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
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
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
