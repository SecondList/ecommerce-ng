import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { merge, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Product } from "src/app/models/product";
import { ProductCategoryService } from "src/app/services/product-category.service";
import { ProductService } from "src/app/services/product.service";
import { hideSpinner, showSpinner } from "../loading-spinner/loading-spinner.actions";
import { createProduct, createProductFailure, createProductSuccess, loadProductFailure, loadProductSuccess, loadProduct, loadProductById } from "./products.actions";
import { ProductState } from "./products.state";

@Injectable()
export class ProductEffect {

    loadProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProduct),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            mergeMap(({ categoryId, pageSize, page }) => {
                let service: Observable<any>;
                pageSize = isNaN(pageSize) ? 10 : pageSize;
                page = isNaN(page) ? 1 : page;
                if (typeof (categoryId) === 'undefined') {
                    service = this.productService.getProducts(pageSize, page);
                } else {
                    service = this.productCategoryService.getProductsByCategory(categoryId, pageSize, page);
                }

                return service.pipe(
                    map((baseResponse) => {
                        // Format product array
                        const products = typeof (categoryId) === 'undefined' ? baseResponse.result : baseResponse.result.products;

                        const formattedProducts = products.map((product: Product) => {
                            return {
                                ...product,
                                imagePath: `${this.productService.getApiUrl()}/image/${new URL(product.imagePath).pathname.split('/').pop()}`
                            };
                        });

                        // Update the state with the formatted products
                        return {
                            ...baseResponse,
                            result: formattedProducts,
                            page: page - 1
                        };
                    }),
                    map(baseResponse => {
                        return loadProductSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(loadProductFailure({ error: error }));
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
            //tap((payload) => console.log(payload))
        )
    );

    loadProductById$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProductById),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            mergeMap(({ productId }) =>
                this.productService.getProduct(productId).pipe(
                    map((baseResponse) => {
                        // Format product
                        const formattedProduct = {
                            ...baseResponse.result,
                            imagePath: `${this.productService.getApiUrl()}/image/${new URL(baseResponse.result.imagePath).pathname.split('/').pop()}`
                        };

                        // Update the state with the formatted products
                        return {
                            ...baseResponse,
                            result: [formattedProduct]
                        };
                    }),
                    map(baseResponse => {
                        return loadProductSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(loadProductFailure({ error: error }));
                    })
                )
            ),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
        )
    );

    addProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(createProduct),
            mergeMap(({ product }) =>
                this.productService.createProduct(product).pipe(
                    map((product) => createProductSuccess({ product: product })),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(createProductFailure({ error: error }))
                    })
                )
            )
        )
    );

    constructor(private actions$: Actions, private productService: ProductService, private productCategoryService: ProductCategoryService, private store: Store<ProductState>, private snackBar: MatSnackBar) { }
}
