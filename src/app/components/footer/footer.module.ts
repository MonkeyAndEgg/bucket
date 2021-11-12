import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FooterComponent } from "./footer.component";

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    MatToolbarModule
  ],
  exports: [
    FooterComponent
  ],
  providers: []
})
export class FooterModule { }
