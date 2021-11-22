import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QueryParam } from 'src/app/constants/query-param.constants';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { NewProductDialogComponent } from '../new-product-dialog/new-product-dialog.component';
import { ViewProductService } from './view-product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit, OnDestroy {
  QueryParam = QueryParam;

  destroySubscription$ = new Subject();
  products: Product[] = [];
  user: User | undefined;

  constructor(public dialog: MatDialog, private service: ViewProductService) { }

  ngOnInit(): void {
    this.service.loadProducts();
    this.service.getProducts().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((products: Product[]) => {
      this.products = products;
    });

    this.service.getCurrentUser().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((user: User | undefined) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  openNewProductDialog() : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '700px';
    dialogConfig.minWidth = '700px';
    this.dialog.open(NewProductDialogComponent, dialogConfig);
  }

  onSort(sort: string): void {
    this.service.loadProducts(sort);
  }
}
