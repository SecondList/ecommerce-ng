import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { selectOrder } from 'src/app/state/order/order.selector';
import { OrderState } from 'src/app/state/order/order.state';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() orderId!: number;
  order$!: Observable<Order>;
  isFolded: boolean = false;

  constructor(private store: Store<{ orderState: OrderState }>) { }

  ngOnInit() {
    this.order$ = this.store.pipe(select(selectOrder(this.orderId)));
  }

  toggleFold() {
    this.isFolded = !this.isFolded;
  }
}
