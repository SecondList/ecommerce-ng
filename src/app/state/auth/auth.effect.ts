import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
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
            switchMap(({ email, password }) => {
                this.store.dispatch(showSpinner());
                return this.authService.login(email, password).pipe(
                    map((baseResponse) => {
                        this.store.dispatch(hideSpinner());
                        localStorage.setItem('userToken', baseResponse.result.token);
                        localStorage.setItem('refreshToken', baseResponse.result.refreshToken);
                        this.snackBar.open(baseResponse.message!, 'Close', {duration: 3000});
                        return loginSuccess({ token: baseResponse.result.token, refreshToken: baseResponse.result.refreshToken });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', {duration: 5000});
                        return of(loginFailure({ error: error }));
                    })
                )
            })
        )
    );

    // logout$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(logout),
    //         tap(() => {
    //             this.store.dispatch(showSpinner());

    //             localStorage.removeItem('userToken');
    //             localStorage.removeItem('refreshToken');
    //             this.snackBar.open('You have logged out.', 'Close', {duration: 3000});
    //             logoutSuccess();
    //             this.store.dispatch(hideSpinner());
    //         })
    //     )
    // );

    register$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            switchMap(({ email, password, confirmPassword }) => {
                this.store.dispatch(showSpinner());
                return this.authService.register(email, password, confirmPassword).pipe(
                    map((baseResponse) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(baseResponse.message!, 'Close', {duration: 3000});
                        return registerSuccess();
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', {duration: 5000});
                        return of(registerFailure({ error: error }));
                    })
                )
            }),
            // tap((payload) => console.log(payload))
        )
    );

    constructor(private actions$: Actions, private authService: AuthService, private store: Store<SpinnerState>, private snackBar: MatSnackBar) { }
}