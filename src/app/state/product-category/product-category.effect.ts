import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ProductCategoryService } from "src/app/services/product-category.service";
import { hideSpinner, showSpinner } from "../loading-spinner/loading-spinner.actions";
import { SpinnerState } from "../loading-spinner/loading-spinner.state";
import { loadProductByCategory, loadProductByCategoryFailure, loadProductByCategorySuccess } from "../products/products.actions";
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
                        return of(loadProductCategoryFailure({ error: error.error.message }));
                    }),
                    tap((error) => console.log(error))
                )
            }),
            tap((payload) => console.log(payload))
        )
    );

    loadProductsByCategory$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
        ofType(loadProductByCategory),
        switchMap(({ categoryId, pageSize, page }) => {
            this.store.dispatch(showSpinner());

            return this.productCategoryService.getProductsByCategory(categoryId, pageSize, page).pipe(
                map(baseResponse => {
                    this.store.dispatch(hideSpinner());
                    return loadProductByCategorySuccess({ baseResponse: baseResponse });
                }),
                catchError((error) => {
                    this.store.dispatch(hideSpinner());
                    return of(loadProductByCategoryFailure({ error: error.error.message }));
                }),
                tap((error) => console.log(error))
            )
        }),
        tap((payload) => console.log(payload))
    )
);

    constructor(private action$: Actions, private productCategoryService: ProductCategoryService, private store: Store<SpinnerState>) { }
}