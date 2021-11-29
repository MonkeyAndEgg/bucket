import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ShowCaseComponent } from "./show-case.component";


@NgModule({
  declarations: [
    ShowCaseComponent
  ],
  imports: [
    CarouselModule,
    CommonModule
  ],
  exports: [
    ShowCaseComponent
  ],
  providers: []
})
export class ShowCaseModule { }
