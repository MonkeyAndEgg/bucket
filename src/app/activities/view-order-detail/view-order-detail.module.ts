import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ViewOrderDetailRoutingModule } from "./view-order-detail-routing.module";
import { ViewOrderDetailComponent } from "./view-order-detail.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    ViewOrderDetailComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    RouterModule,
    ViewOrderDetailRoutingModule
  ],
  exports: [
    ViewOrderDetailComponent
  ],
  providers: []
})
export class ViewOrderDetailModule { }
