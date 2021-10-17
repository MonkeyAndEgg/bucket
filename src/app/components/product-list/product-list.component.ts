import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()
  products = [
    {
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. \
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally \
        bred for hunting.'
    },
    {
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. \
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally \
        bred for hunting.'
    },
    {
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. \
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally \
        bred for hunting.'
    },
    {
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. \
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally \
        bred for hunting.'
    },
    {
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. \
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally \
        bred for hunting.'
    }
  ];

  @Input()
  cols = 4;

  constructor() { }

  ngOnInit(): void {
  }

}
