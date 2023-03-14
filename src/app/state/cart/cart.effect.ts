import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Cart } from "src/app/models/cart";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";
import { UserService } from "src/app/services/user.service";
import { hideSpinner, showSpinner } from "../loading-spinner/loading-spinner.actions";
import { createCart, createCartFailure, createCartSuccess, loadCartFailure, loadCartSuccess, loadCart, deleteCart, clearCart, deleteCartFailure, deleteCartSuccess, clearCartSuccess, clearCartFailure, updateCart, updateCartSuccess, updateCartFailure } from "./cart.actions";
import { CartState } from "./cart.state";

@Injectable()
export class CartEffect {
    addToCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(createCart),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            mergeMap(({ productId, orderQty }) => {
                return this.cartService.addToCart(productId, orderQty).pipe(
                    map((baseResponse) => {
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return createCartSuccess({ cart: baseResponse.result });
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(createCartFailure({ error: error }))
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
        )
    );

    loadCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCart),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            mergeMap(({ pageSize, page }) => {
                pageSize = isNaN(pageSize) ? 10 : pageSize;
                page = isNaN(page) ? 1 : page;

                return this.userService.getUserCarts(pageSize, page).pipe(
                    map((baseResponse) => {
                        const formattedCarts = baseResponse.result.map((cart: Cart) => {
                            const product = {
                                ...cart.product,
                                imagePath: `${this.productService.getApiUrl()}/image/${new URL(cart.product.imagePath).pathname.split('/').pop()}`
                            }

                            return {
                                ...cart,
                                product: product
                            };
                        });

                        // Update the state with the formatted products
                        return {
                            ...baseResponse,
                            result: formattedCarts,
                            page: page - 1
                        };
                    }),
                    map((baseResponse) => {
                        return loadCartSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(loadCartFailure({ error: error }))
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
        )
    );

    updateCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCart),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            mergeMap(({ productId, orderQty }) => {
                return this.cartService.updateOrderQty(productId, orderQty).pipe(
                    map((baseResponse) => {
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return updateCartSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(updateCartFailure({ error: error }))
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
        )
    );

    deleteCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCart),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            mergeMap(({ productId }) => {
                return this.cartService.deleteFromCart(productId).pipe(
                    map((baseResponse) => {
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return deleteCartSuccess({ productId: productId });
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(deleteCartFailure({ error: error }))
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
        )
    );

    deleteCartSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCartSuccess),
            map(({ productId }) =>
                loadCart({ pageSize: 10, page: 1 })
            )
        )
    );

    clearCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(clearCart),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            mergeMap(() => {
                return this.cartService.clearCart().pipe(
                    map((baseResponse) => {
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return clearCartSuccess();
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(clearCartFailure({ error: error }))
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
        )
    );

    constructor(private actions$: Actions, private cartService: CartService, private productService: ProductService, private userService: UserService, private store: Store<CartState>, private snackBar: MatSnackBar) { }
}
