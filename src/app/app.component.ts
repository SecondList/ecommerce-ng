import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { loginSuccess } from './state/auth/auth.actions';
import { isSpinnerShowing } from './state/loading-spinner/loading-spinner.selector';
import { SpinnerState } from './state/loading-spinner/loading-spinner.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-ng';
  loading$!: Observable<boolean>;

  constructor(private store: Store<SpinnerState>, private cookieService: CookieService, private authService: AuthService) { }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(isSpinnerShowing));

    const token = this.cookieService.get('userToken');
    const refreshToken = this.cookieService.get('refreshToken');

    if (token && this.authService.isAuthenticated()) {
      this.store.dispatch(loginSuccess({ token: token, refreshToken: refreshToken ? refreshToken : '' }));
    }
  }
}
