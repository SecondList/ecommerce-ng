import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";
import { hideSpinner, showSpinner } from "../loading-spinner/loading-spinner.actions";
import { SpinnerState } from "../loading-spinner/loading-spinner.state";
import { addProduct, createProductFailure, createProductSuccess, loadProductFailure, loadProductSuccess, loadProduct } from "./products.actions";

@Injectable()
export class ProductEffect {

    loadProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProduct),
            mergeMap(({ pageSize, page }) => {
                this.store.dispatch(showSpinner());

                return this.productService.getProducts(pageSize, page).pipe(
                    map((baseResponse) => {
                        // Formate product array
                        const formattedProducts = baseResponse.result.map((product: Product) => {
                            return {
                                ...product,
                                imagePath: `${this.productService.getApiUrl()}/image/${new URL(product.imagePath).pathname.split('/').pop()}`
                            };
                        });

                        // Update the state with the formatted products
                        return {
                            ...baseResponse,
                            result: formattedProducts
                        };
                    }),
                    map(baseResponse => {
                        this.store.dispatch(hideSpinner());
                        return loadProductSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        return of(loadProductFailure({ error: error.error.message }));
                    })
                )
            }),
            //tap((payload) => console.log(payload))
        )
    );

    addProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(addProduct),
            mergeMap(({ product }) =>
                this.productService.createProduct(product).pipe(
                    map((product) => createProductSuccess({ product: product })),
                    catchError((error) => of(createProductFailure({ error: error.error.message })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private productService: ProductService, private store: Store<SpinnerState>) { }
}
