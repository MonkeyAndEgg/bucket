import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FilterOption } from "src/app/models/filter-option";
import { Product } from "src/app/models/product";
import { User } from "src/app/models/user";
import { selectUser } from "src/app/store/auth/auth.selector";
import { loadProducts } from "src/app/store/product/product.actions";
import { selectProducts } from "src/app/store/product/product.selector";
import { NewProductDialogComponent } from "../../components/new-product-dialog/new-product-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {
  constructor(private store: Store, private dialog: MatDialog,) {}

  loadProducts(filterOptions?: FilterOption[], sort?: string): void {
    const filterParam = this.generateFilterParamForType(filterOptions);
    this.store.dispatch(loadProducts({ filter: filterParam, sort }));
  }

  getProducts(): Observable<Product[]> {
    return this.store.select(selectProducts);
  }

  getCurrentUser(): Observable<User | undefined> {
    return this.store.select(selectUser);
  }

  openDialog(config: MatDialogConfig): void {
    this.dialog.open(NewProductDialogComponent, config);
  }

  private generateFilterParamForType(filterOptions: FilterOption[] | undefined): string {
    let filterParam = '';
    if (filterOptions) {
      let optionList = [];
      optionList = filterOptions.map((option: FilterOption) => {
        if (option.checked) {
          return option.value;
        } else {
          return;
        }
      });
      optionList.forEach((item: string | undefined) => {
        if (item) {
          if (filterParam.length > 0) {
            filterParam += item && item.length > 0 ? '-' + item : '';
          } else {
            filterParam = 'type:' + item;
          }
        }
      });
    }
    return filterParam;
  }
}
