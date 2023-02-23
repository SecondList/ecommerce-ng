import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response';
import { ProductCategoryState } from 'src/app/state/product-category/product-category.state';
import { loadProduct } from 'src/app/state/products/products.actions';
import { retrieveProductBaseResponse } from 'src/app/state/products/products.selector';
import { ProductState } from 'src/app/state/products/products.state';
import { AddCartButtonComponent } from '../add-cart-button/add-cart-button.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productBaseResponse$: Observable<BaseResponse> = this.store.pipe(select(retrieveProductBaseResponse));
  pageSizeOptions = [5, 10];

  constructor(private store: Store<{ productState: ProductState, productCategoryState: ProductCategoryState }>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.route.queryParams
    ]).pipe(
      switchMap(async ([params, queryParams]) => {
        const pageSize = this.pageSizeOptions.includes(+queryParams['pageSize']) ? queryParams['pageSize'] : 10;
        const page = isNaN(queryParams['page']) ? 1 : queryParams['page'];

        this.store.dispatch(loadProduct({ categoryId: params['categoryId'], pageSize: pageSize, page: page }))
      })
    ).subscribe();
  }

  onPageChange(event: any) {
    const queryParams = { page: event.pageIndex + 1, pageSize: event.pageSize };
    this.router.navigate([], { queryParams });
  }
}
