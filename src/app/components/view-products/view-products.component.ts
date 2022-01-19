import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductTypeEnum } from 'src/app/constants/product-type-enum.constants';
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
        name: ProductTypeEnum.BAGS_LABEL, value: ProductTypeEnum.BAGS_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductTypeEnum.ELECTRONIC_DEVICES_LABEL, value: ProductTypeEnum.ELECTRONIC_DEVICES_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductTypeEnum.FURNITURE_LABEL, value: ProductTypeEnum.FURNITURE_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductTypeEnum.FOOD_AND_BEVERAGE_LABEL, value: ProductTypeEnum.FOOD_AND_BEVERAGE_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductTypeEnum.PETS_LABEL, value: ProductTypeEnum.PETS_VALUE, checked: false, color: 'accent'
      },
      {
        name: ProductTypeEnum.OTHERS_LABEL, value: ProductTypeEnum.OTHERS_VALUE, checked: false, color: 'accent'
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
