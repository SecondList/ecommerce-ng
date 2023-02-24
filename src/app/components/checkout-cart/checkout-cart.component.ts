import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { selectCheckOutCart } from 'src/app/state/cart/cart.selector';
import { CartState } from 'src/app/state/cart/cart.state';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent {
  cartBaseResponse$!: Observable<Cart[]>;
  displayedColumns: string[] = ['title', 'orderQty', 'totalPrice'];
  dataSource!: MatTableDataSource<Cart>;
  checkOutTotalPrice: number = 0;
  isFolded: boolean = false;
  @Output() cartEmitter = new EventEmitter<Cart[]>();

  constructor(private store: Store<{ cartState: CartState }>, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartBaseResponse$ = this.store.pipe(select(selectCheckOutCart));
    this.cartBaseResponse$.subscribe(carts => {
      this.cartEmitter.emit(carts);
      if (!carts || carts?.length < 1) {
        this.snackBar.open("Please select item to perform checkout.", 'Close', { duration: 5000 });
        this.router.navigate(['/cart']);
        return;
      }

      this.dataSource = new MatTableDataSource(carts);
      this.checkOutTotalPrice = carts.reduce((total, current) => total + (current.orderQty * current.product.price), 0);
    })
  }

  toggleFold() {
    this.isFolded = !this.isFolded;
  }
}
