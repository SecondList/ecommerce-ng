import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { retrieveToken } from '../state/auth/auth.selector';
import { AuthState } from '../state/auth/auth.state';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(retrieveToken),
      map(token => {
        if (!this.authService.isAuthenticated(token)) {
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
          this.snackBar.open('Please login', 'Close', { duration: 5000 });
          return false;
        }
        return true;
      })
    );

  }

  constructor(private store: Store<AuthState>, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }
}
