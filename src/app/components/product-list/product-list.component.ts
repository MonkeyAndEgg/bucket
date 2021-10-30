import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { User } from '../../models/user';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input()
  products: Product[] = [];

  @Input()
  cols = 4;

  user: User | undefined;
  cart: Cart | undefined;
  destroySubscription$ = new Subject();

  constructor(private service: ProductListService) { }

  ngOnInit(): void {
    this.service.getCurrentUser().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((user: User) => {
      this.user = user;
    });

    this.service.getUserCart().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((cart: Cart) => {
      this.cart = cart && cart.products && cart.userId ? cart : undefined;
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onAddToCart(productId: string | undefined): void {
    if (productId && this.user) {
      this.service.addToCart(productId, this.user.id, this.cart);
    }
  }

  onDelete(id: string | undefined): void {
    if (id) {
      this.service.deleteProduct(id);
    }
  }
}
