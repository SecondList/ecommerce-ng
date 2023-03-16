import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { loadProductById } from 'src/app/state/products/products.actions';
import { retrieveProductBaseResponse, selectProduct } from 'src/app/state/products/products.selector';
import { ProductState } from 'src/app/state/products/products.state';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product$!: Observable<Product>;

  constructor(private store: Store<{ productState: ProductState }>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('productId')!;
    this.store.dispatch(loadProductById({ productId }));
    this.product$ = this.store.pipe(select(selectProduct(productId)));
  }
}
