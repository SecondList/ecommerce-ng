import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable, first, mergeMap, of, catchError, throwError } from 'rxjs';
import { logoutSuccess } from '../state/auth/auth.actions';
import { retrieveToken } from '../state/auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private store$: Store<any>, private router: Router, private cookieService: CookieService) { }

  /**
     * Intercepts all HTTP requests and adds the JWT token to the request's header if the URL
     * is a REST endpoint and not login or logout.
     */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Consider only adding the auth header to API requests as this will add it to all HTTP requests.
    return this.addToken(request).pipe(
      first(),
      mergeMap((requestWithToken: HttpRequest<any>) => {
        return next.handle(requestWithToken).pipe(
          catchError((err) => {
            let message: string = err.error.message;
            switch (err.status) {
              case 401:
                this.store$.dispatch(logoutSuccess());
                message = "Please login";
                this.cookieService.delete('userToken');
                this.cookieService.delete('refreshToken');
                break;
              case 403:
                message = "You not allowed to perform this action!";
                break;
            }

            const error = message || err.error.Errors || err.statusText;

            return throwError(error);
          })
        );
      })
    );
  }

  /**
  * Adds the JWT token to the request's header.
  */
  private addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    // NOTE: DO NOT try to immediately setup this selector in the constructor or as an assignment in a
    // class member variable as there's no stores available when this interceptor fires fires up and
    // as a result it'll throw a runtime error.
    return this.store$.pipe(
      select(retrieveToken),
      first(),
      mergeMap((token: string) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          console.warn(`Cannot use token "${token}".`);
        }
        return of(request);
      })
    );
  }
}
