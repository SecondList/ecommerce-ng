import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response';
import { retrieveProduct } from 'src/app/state/products/products.actions';
import { ProductState } from 'src/app/state/products/products.state';
import { AddCartButtonComponent } from '../add-cart-button/add-cart-button.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productBaseResponse$: Observable<BaseResponse> = this.store.pipe(
    select((state) => state.productState.products)
  );
  mybreakpoint: number | undefined;

  constructor(private store: Store<{ productState: ProductState }>) { }

  ngOnInit(): void {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
    this.store.dispatch(retrieveProduct({ pageSize: 8, page: 1 }));
  }

  // handleSize(event) {
  //   this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
  // }
}
