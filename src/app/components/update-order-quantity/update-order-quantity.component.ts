import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateCart } from 'src/app/state/cart/cart.actions';
import { retrieveCartOrderQty } from 'src/app/state/cart/cart.selector';
import { CartState } from 'src/app/state/cart/cart.state';

@Component({
  selector: 'app-update-order-quantity',
  templateUrl: './update-order-quantity.component.html',
  styleUrls: ['./update-order-quantity.component.css']
})
export class UpdateOrderQuantityComponent {
  @Input() productId!: number;
  orderQty$!: Observable<number>;
  orderQty!: number;
  inputOrderQty!: number;
  minOrderQty = 1;
  maxOrderQty = 10;

  constructor(private store: Store<{ cartState: CartState }>) { }

  ngOnInit() {
    this.orderQty$ = this.store.pipe(select(retrieveCartOrderQty(this.productId)))
    this.orderQty$.subscribe((orderQty: number) => {
      this.orderQty = orderQty
    });
  }

  public updateOrderQty(productId: number, orderQty: number) {
    this.store.dispatch(updateCart({ productId: productId, orderQty: orderQty }));
  }

  increment() {
    if (this.orderQty < this.maxOrderQty) {
      this.updateOrderQty(this.productId, this.orderQty + 1);
    }
  }

  decrement() {
    if (this.orderQty > this.minOrderQty) {
      this.updateOrderQty(this.productId, this.orderQty - 1);
    }
  }

  inputChanged() {
    if (!isNaN(this.inputOrderQty) && this.inputOrderQty >= this.minOrderQty && this.inputOrderQty <= this.maxOrderQty) {
      this.updateOrderQty(this.productId, this.inputOrderQty);
    }
  }

}
