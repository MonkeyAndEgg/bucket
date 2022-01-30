import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductType } from 'src/app/constants/product-type.constants';
import { QueryParam } from 'src/app/constants/query-param.constants';
import { FilterOption } from 'src/app/models/filter-option';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
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
    checked: false,
    color: 'warn',
    subOptions: [
      {
        name: ProductType.BAGS_LABEL, value: ProductType.BAGS_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductType.ELECTRONIC_DEVICES_LABEL, value: ProductType.ELECTRONIC_DEVICES_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductType.FURNITURE_LABEL, value: ProductType.FURNITURE_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductType.FOOD_AND_BEVERAGE_LABEL, value: ProductType.FOOD_AND_BEVERAGE_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductType.PETS_LABEL, value: ProductType.PETS_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductType.OTHERS_LABEL, value: ProductType.OTHERS_VALUE, checked: false, color: 'accent'
      }
    ]
  };
  allChecked = true;
  user: User | undefined;

  constructor(private service: ViewProductService) { }

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
    this.service.loadProducts(this.filterOption.subOptions);
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
    this.service.loadProducts(this.filterOption.subOptions);
  }

  openNewProductDialog() : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '700px';
    dialogConfig.minWidth = '700px';
    this.service.openDialog(dialogConfig);
  }

  onSort(sort: string): void {
    this.service.loadProducts(undefined, sort);
  }
}
