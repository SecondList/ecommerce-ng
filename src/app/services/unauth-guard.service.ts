import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { retrieveToken } from '../state/auth/auth.selector';
import { AuthState } from '../state/auth/auth.state';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuardService implements CanActivate {

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(retrieveToken),
      map(token => {
        if (this.authService.isAuthenticated(token)) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );

  }

  constructor(private store: Store<AuthState>, private authService: AuthService, private router: Router) { }
}
