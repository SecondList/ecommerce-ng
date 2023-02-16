import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.actions';


@Injectable()
export class AuthEffect {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map((baseResponse) => loginSuccess({ token: baseResponse.result.token })),
                    catchError((error) => of(loginFailure({ error })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private authService: AuthService) { }
}