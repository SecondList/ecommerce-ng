import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteCart } from 'src/app/state/cart/cart.actions';
import { CartState } from 'src/app/state/cart/cart.state';

@Component({
  selector: 'app-delete-from-cart',
  templateUrl: './delete-from-cart.component.html',
  styleUrls: ['./delete-from-cart.component.css']
})
export class DeleteFromCartComponent {
  @Input() productId!: number;

  constructor(private store: Store<{ cartState: CartState }>) { }

  public removeFromCart() {
    this.store.dispatch(deleteCart({ productId: this.productId}));
  }
}
