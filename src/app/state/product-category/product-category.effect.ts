import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ProductCategoryService } from "src/app/services/product-category.service";
import { hideSpinner, showSpinner } from "../loading-spinner/loading-spinner.actions";
import { SpinnerState } from "../loading-spinner/loading-spinner.state";
import { loadProductCategory, loadProductCategoryFailure, loadProductCategorySuccess } from "./product-category-actions";

@Injectable()
export class ProductCategoryEffect {

    loadProductCategory$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(loadProductCategory),
            mergeMap(() => {
                this.store.dispatch(showSpinner());

                return this.productCategoryService.getProductCategories().pipe(
                    map(baseResponse => {
                        this.store.dispatch(hideSpinner());
                        return loadProductCategorySuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', {duration: 5000});
                        return of(loadProductCategoryFailure({ error: error }));
                    })
                )
            })
        )
    );

    constructor(private action$: Actions, private productCategoryService: ProductCategoryService, private store: Store<SpinnerState>, private snackBar: MatSnackBar) { }
}