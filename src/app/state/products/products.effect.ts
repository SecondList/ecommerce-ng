import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { BaseResponse } from "src/app/models/base-response";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";
import { addProduct, createProductFailure, createProductSuccess, retrieveProduct, loadProductFailure, loadProductSuccess } from "./products.actions";

@Injectable()
export class ProductEffects {

    loadProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(retrieveProduct),
            switchMap(({ pageSize, page }) =>
                this.productService.getProducts(pageSize, page).pipe(
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
                        }
                    }),
                    map(baseResponse => loadProductSuccess({ baseResponse: baseResponse })),
                )
            ),
            tap((payload) => console.log(payload))
        )
    );

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addProduct),
            switchMap(({ product }) =>
                this.productService.createProduct(product).pipe(
                    map((product) => createProductSuccess({ product: product })),
                    catchError((error) => of(createProductFailure({ error: error })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private productService: ProductService) { }
}
