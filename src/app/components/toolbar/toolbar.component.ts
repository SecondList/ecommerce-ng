import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/models/product-category';
import { logout } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';
import { loadProductCategory } from 'src/app/state/product-category/product-category-actions';
import { retrieveProdductCategories } from 'src/app/state/product-category/product-category.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  toolbarTitle = "ABC Grocery";
  isAuthenticated$: Observable<string> = this.store.pipe(
    select((state) => state.authState.token)
  );
  productCategory$ = this.store.pipe(select(retrieveProdductCategories));

  constructor(private store: Store<{ authState: AuthState }>) { }

  ngOnInit(): void {
    this.store.dispatch(loadProductCategory());
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
