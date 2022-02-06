import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderStatus } from 'src/app/constants/product-status.constants';
import { AddressData } from 'src/app/models/address-data';
import { Order } from 'src/app/models/order';
import { ProductData } from 'src/app/models/product-data';
import { ViewOrderDetailService } from './view-order-detail.service';

@Component({
  selector: 'app-view-order-detail',
  templateUrl: './view-order-detail.component.html',
  styleUrls: ['./view-order-detail.component.css']
})
export class ViewOrderDetailComponent implements OnInit {
  destroySubscription$ = new Subject();
  order: Order | undefined;
  summaryTexts: string[] = [];
  progressMap = new Map();
  shippingAddress = {} as AddressData;

  constructor(private service: ViewOrderDetailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.progressMap.set(OrderStatus.WAIT_TO_DELIVER, 10);
    this.progressMap.set(OrderStatus.IN_PROGRESS, 50);
    this.progressMap.set(OrderStatus.DELIVERED, 100);

    this.route.params.pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe(params => {
      this.service.loadOrderById(params.id);
    });

    this.service.getSelectedOrder().pipe(
      takeUntil(this.destroySubscription$)
    ).subscribe((order: Order | undefined) => {
      if (order) {
        this.order = order;
        this.shippingAddress = order.address.shipping;
        this.summaryTexts = this.generateOrderSummaryTexts(this.order.products);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }

  private generateOrderSummaryTexts(products: ProductData[]): string[] {
    const resultTexts: string[] = [];
    products.forEach(product => {
      resultTexts.push(`${product.product.name} * (${product.quantity})`)
    });
    return resultTexts;
  }
}
