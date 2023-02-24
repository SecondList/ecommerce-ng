import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, combineLatest, switchMap } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response';
import { loadOrder } from 'src/app/state/order/order.actions';
import { retrieveOrderBaseResponse } from 'src/app/state/order/order.selector';
import { OrderState } from 'src/app/state/order/order.state';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orderBaseResponse$: Observable<BaseResponse> = this.store.pipe(select(retrieveOrderBaseResponse));
  pageSizeOptions = [5, 10];

  constructor(private store: Store<{ orderState: OrderState }>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.route.queryParams
    ]).pipe(
      switchMap(async ([params, queryParams]) => {
        const pageSize = this.pageSizeOptions.includes(+queryParams['pageSize']) ? queryParams['pageSize'] : 10;
        const page = isNaN(queryParams['page']) ? 1 : queryParams['page'];

        this.store.dispatch(loadOrder({ pageSize: pageSize, page: page }))
      })
    ).subscribe();
  }

  onPageChange(event: any) {
    const queryParams = { page: event.pageIndex + 1, pageSize: event.pageSize };
    this.router.navigate([], { queryParams });
  }
}
