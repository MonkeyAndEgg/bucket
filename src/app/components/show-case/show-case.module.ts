import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ShowCaseComponent } from "./show-case.component";


@NgModule({
  declarations: [
    ShowCaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  exports: [
    ShowCaseComponent
  ],
  providers: []
})
export class ShowCaseModule { }
