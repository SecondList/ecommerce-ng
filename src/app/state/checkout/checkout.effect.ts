import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CheckoutService } from "src/app/services/checkout.service";
import { UserService } from "src/app/services/user.service";
import { hideSpinner, showSpinner } from "../loading-spinner/loading-spinner.actions";
import { checkout, checkoutFailure, checkoutSuccess } from "./checkout.actions";
import { CheckoutState } from "./checkout.state";

@Injectable()
export class CheckoutEffect {
    checkout$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(checkout),
            mergeMap(({ productIds, firstName, lastName, receiptEmail, address1, city, state, postalCode, country, carrier, card }) => {
                this.store.dispatch(showSpinner());
                return this.checkoutService.checkout(productIds, firstName, lastName, receiptEmail, address1, city, state, postalCode, country, carrier, card).pipe(
                    map((baseResponse) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return checkoutSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(checkoutFailure({ error: error }))
                    })
                )
            })
        )
    );

    constructor(private actions$: Actions, private userService: UserService, private checkoutService: CheckoutService, private store: Store<CheckoutState>, private snackBar: MatSnackBar) { }
}