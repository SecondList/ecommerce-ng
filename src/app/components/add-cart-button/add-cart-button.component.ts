import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { createCart } from 'src/app/state/cart/cart.actions';
import { CartState } from 'src/app/state/cart/cart.state';

@Component({
  selector: 'app-add-cart-button',
  templateUrl: './add-cart-button.component.html',
  styleUrls: ['./add-cart-button.component.css']
})
export class AddCartButtonComponent {
  @Input() productId!: number;

  constructor(private store: Store<{ cartState: CartState }>) { }

  public addToCart() {
    this.store.dispatch(createCart({ productId: this.productId, orderQty: 1 }));
  }
}
