import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response';
import { ProductCategoryState } from 'src/app/state/product-category/product-category.state';
import { loadProduct, loadProductByCategory } from 'src/app/state/products/products.actions';
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
  categoryId: any = null;
  pageSize: any;
  page: any;

  constructor(private store: Store<{ productState: ProductState, productCategoryState: ProductCategoryState }>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.pageSize = params['pageSize'];
      this.page = params['page'];
    });

    this.store.dispatch(loadProduct({ categoryId: this.categoryId, pageSize: 10, page: 1 }));
  }

  onPageChange(event: any) {
    this.store.dispatch(loadProduct({ categoryId: this.categoryId, pageSize: event.pageSize, page: event.pageIndex + 1 }));
  }


}
