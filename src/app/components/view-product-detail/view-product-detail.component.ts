import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ViewProductDetailService } from './view-product-detail.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.css']
})
export class ViewProductDetailComponent implements OnInit, OnDestroy {
  destroySubscription$ = new Subject();
  product: Product | undefined;
  constructor(private route: ActivatedRoute, private service: ViewProductDetailService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroySubscription$)).subscribe(params => {
      this.service.loadProductById(params.id);
    });

    this.service.getSelectedProduct()
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe((product: Product | undefined) => {
        this.product = product;
      });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }
}
