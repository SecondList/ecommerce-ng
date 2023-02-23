import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(private store: Store<SpinnerState>) { }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(isSpinnerShowing));

    const token = localStorage.getItem('userToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      this.store.dispatch(loginSuccess({ token: token, refreshToken: refreshToken ? refreshToken : '' }));
    }
  }
}
