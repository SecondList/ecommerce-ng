
import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response';
import { Cart } from 'src/app/models/cart';
import { loadCart, updateSelectedCart } from 'src/app/state/cart/cart.actions';
import { retrieveCartBaseResponse, retrieveCartError } from 'src/app/state/cart/cart.selector';
import { CartState } from 'src/app/state/cart/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartBaseResponse$!: Observable<BaseResponse>;
  pageSizeOptions = [10, 20];

  displayedColumns: string[] = ['select', 'title', 'price', 'orderQty', 'totalPrice', 'action'];
  dataSource!: MatTableDataSource<Cart>;
  selection: SelectionModel<Cart> = new SelectionModel<Cart>(true, []);

  constructor(private store: Store<{ cartState: CartState }>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cartBaseResponse$ = this.store.pipe(select(retrieveCartBaseResponse));
    this.cartBaseResponse$.subscribe(baseResponse => {
      this.dataSource = new MatTableDataSource(baseResponse.result);
      const tempSelection = this.selection.selected;
      this.selection.clear();

      baseResponse.result?.map((cart: Cart) => {
        const index = tempSelection.findIndex(selectedCart => selectedCart.productId == cart.productId);
        if (index > -1) {
          this.selection.select(cart);
        }
      });
    });

    combineLatest([
      this.route.params,
      this.route.queryParams
    ]).pipe(
      switchMap(async ([params, queryParams]) => {
        const pageSize = this.pageSizeOptions.includes(+queryParams['pageSize']) ? queryParams['pageSize'] : 10;
        const page = isNaN(queryParams['page']) ? 1 : queryParams['page'];

        this.store.dispatch(loadCart({ pageSize: pageSize, page: page }));
      })
    ).subscribe();
  }

  onPageChange(event: any) {
    const queryParams = { page: event.pageIndex + 1, pageSize: event.pageSize };
    this.router.navigate([], { queryParams });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cart): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.productId + 1}`;
  }

  checkOutTotalPrice() {
    return this.selection.selected.reduce((total, current) => total + (current.orderQty * current.product.price), 0);
  }

  toCheckOut() {
    this.store.dispatch(updateSelectedCart({selectedCarts: this.selection.selected}));
    this.router.navigate(['/checkout']);
  }
}
