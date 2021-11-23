import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QueryParam } from 'src/app/constants/query-param.constants';
import { FilterOption } from 'src/app/models/filter-option';
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
  filterOption: FilterOption = {
    name: 'All',
    checked: true,
    color: 'warn',
    subOptions: [
      { name: 'Bags', checked: true, color: 'accent' },
      { name: 'Eletronic Devices', checked: true, color: 'accent' },
      { name: 'Furniture', checked: true, color: 'accent' },
      { name: 'Food & Beverage', checked: true, color: 'accent' },
      { name: 'Pets', checked: true, color: 'accent' },
      { name: 'Other', checked: true, color: 'accent' }
    ]
  };
  allChecked = true;
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

  updateAllChecked(): void {
    this.allChecked = this.filterOption.subOptions != null && this.filterOption.subOptions.every(t => t.checked);
  }

  someChecked(): boolean {
    if (this.filterOption.subOptions == null) {
      return false;
    }
    return this.filterOption.subOptions.filter(t => t.checked).length > 0 && !this.allChecked;
  }

  setAll(checked: boolean) {
    this.allChecked = checked;
    if (this.filterOption.subOptions == null) {
      return;
    }
    this.filterOption.subOptions.forEach(t => (t.checked = checked));
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
