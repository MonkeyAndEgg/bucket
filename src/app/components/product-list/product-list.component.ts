import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart/cart';
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
  cols = 6;

  @Input()
  gutterSize = '20px';

  user: User | undefined;
  cart: Cart | undefined;
  destroySubscription$ = new Subject();

  constructor(private service: ProductListService, private router: Router) { }

  ngOnInit(): void {
    this.service.getCurrentUser().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.service.getUserCart().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((cart: Cart | undefined) => {
      this.cart = cart && cart.products && cart.userId ? cart : undefined;
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  onAddToCart(productId: string | undefined): void {
    if (productId && this.user) {
      this.service.addToCart(productId, this.user.id, this.cart);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onDelete(id: string | undefined): void {
    if (id) {
      this.service.deleteProduct(id);
    }
  }

  prepareAlterImage(event: any): void {
    event.target.src = './assets/images/product_404.png';
  }
}
