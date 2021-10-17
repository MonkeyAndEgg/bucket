import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-show-case',
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.css']
})
export class ShowCaseComponent implements OnInit {

  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayTimeout:8000,
    autoplayHoverPause:true
  };

  imageOptions = [
    { src: './assets/images/showcase_1.jpg', alt: 'showcase_1' },
    { src: './assets/images/showcase_2.jpg', alt: 'showcase_2' },
    { src: './assets/images/showcase_3.jpg', alt: 'showcase_3' },
    { src: './assets/images/showcase_4.jpg', alt: 'showcase_4' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
