import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthModule } from "../auth/auth.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    MatBadgeModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: []
})
export class HeaderModule { }
