import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearCart } from 'src/app/state/cart/cart.actions';
import { CartState } from 'src/app/state/cart/cart.state';

@Component({
  selector: 'app-clear-cart',
  templateUrl: './clear-cart.component.html',
  styleUrls: ['./clear-cart.component.css']
})
export class ClearCartComponent {

  constructor(private store: Store<{ cartState: CartState }>) { }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}
