import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  toolbarTitle = "ABC Grocery";
  isAuthenticated$: Observable<string> = this.store.pipe(
    select((state) => state.authState.token)
  );

  constructor(private store: Store<{ authState: AuthState }>) { }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
