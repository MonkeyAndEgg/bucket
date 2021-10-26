import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()
  products: Product[] = [];

  @Input()
  cols = 4;

  constructor(private service: ProductListService) { }

  ngOnInit(): void {
  }

  onDelete(id: string | undefined): void {
    if (id) {
      this.service.deleteProduct(id);
    }
  }
}
