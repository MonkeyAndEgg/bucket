import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ViewSearchService } from './view-search.service';

@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.css']
})
export class ViewSearchComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  keyword = '';
  destroySubscription$ = new Subject();

  constructor(private service: ViewSearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroySubscription$)).subscribe(params => {
      this.keyword = params.keyword;
      this.service.loadProducts(this.keyword);
    });

    this.service.getProducts().pipe(takeUntil(this.destroySubscription$)).subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }
}
