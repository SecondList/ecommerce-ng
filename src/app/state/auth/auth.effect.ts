import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { hideSpinner, showSpinner } from '../loading-spinner/loading-spinner.actions';
import { SpinnerState } from '../loading-spinner/loading-spinner.state';
import { login, loginSuccess, loginFailure, register, registerSuccess, registerFailure, logout, logoutSuccess } from './auth.actions';


@Injectable()
export class AuthEffect {
    login$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            switchMap(({ email, password }) => {
                return this.authService.login(email, password).pipe(
                    map((baseResponse) => {
                        this.cookieService.set('userToken', baseResponse.result.token);
                        this.cookieService.set('refreshToken', baseResponse.result.refreshToken);
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return loginSuccess({ token: baseResponse.result.token, refreshToken: baseResponse.result.refreshToken });
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(loginFailure({ error: error }));
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
        )
    );

    register$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            switchMap(({ email, password, confirmPassword }) => {
                return this.authService.register(email, password, confirmPassword).pipe(
                    map((baseResponse) => {
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return registerSuccess();
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(registerFailure({ error: error }));
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
            // tap((payload) => console.log(payload))
        )
    );

    constructor(private actions$: Actions, private authService: AuthService, private store: Store<SpinnerState>, private snackBar: MatSnackBar, private cookieService: CookieService) { }
}