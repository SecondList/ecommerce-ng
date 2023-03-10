import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { logoutSuccess } from 'src/app/state/auth/auth.actions';
import { retrieveToken } from 'src/app/state/auth/auth.selector';
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
  isAuthenticated$: Observable<string> = this.store.pipe(select(retrieveToken));
  productCategory$ = this.store.pipe(select(retrieveProdductCategories));

  constructor(private store: Store<{ authState: AuthState }>, private snackBar: MatSnackBar, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.store.dispatch(loadProductCategory());
  }

  public logout(): void {
    this.store.dispatch(logoutSuccess());
    
    this.cookieService.delete('userToken');
    this.cookieService.delete('refreshToken');

    this.snackBar.open('You have logged out.', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }
}
