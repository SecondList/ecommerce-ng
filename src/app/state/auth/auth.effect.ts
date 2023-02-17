import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { hideSpinner, showSpinner } from '../loading-spinner/loading-spinner.actions';
import { login, loginSuccess, loginFailure, register, registerSuccess, registerFailure } from './auth.actions';
import { AuthState } from './auth.state';


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
                        return loginSuccess({ token: baseResponse.result.token, refreshToken: baseResponse.result.refreshToken });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        return of(loginFailure({ error: error.error.message }));
                    })
                )
            })
        )
    );

    register$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            switchMap(({ email, password, confirmPassword }) => {
                this.store.dispatch(showSpinner());
                return this.authService.register(email, password, confirmPassword).pipe(
                    map((baseResponse) => {
                        this.store.dispatch(hideSpinner());
                        return registerSuccess();
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        return of(registerFailure({ error: error.error.message }));
                    })
                )
            }),
            tap((payload) => console.log(payload))
        )
    );

    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AuthState>) { }
}