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
            mergeMap(({ productId, orderQty }) => {
                this.store.dispatch(showSpinner());
                return this.cartService.addToCart(productId, orderQty).pipe(
                    map((baseResponse) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return createCartSuccess({ cart: baseResponse.result });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(createCartFailure({ error: error }))
                    })
                )
            })
        )
    );

    loadCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCart),
            mergeMap(({ pageSize, page }) => {
                this.store.dispatch(showSpinner());
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
                        this.store.dispatch(hideSpinner());
                        return loadCartSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(loadCartFailure({ error: error }))
                    })
                )
            })
        )
    );

    updateCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCart),
            mergeMap(({ productId, orderQty }) => {
                this.store.dispatch(showSpinner());
                return this.cartService.updateOrderQty(productId, orderQty).pipe(
                    map((baseResponse) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return updateCartSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(updateCartFailure({ error: error }))
                    })
                )
            })
        )
    );

    deleteCart$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCart),
            mergeMap(({ productId }) => {
                this.store.dispatch(showSpinner());
                return this.cartService.deleteFromCart(productId).pipe(
                    map((baseResponse) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return deleteCartSuccess({ productId: productId });
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(deleteCartFailure({ error: error }))
                    })
                )
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
            mergeMap(() => {
                this.store.dispatch(showSpinner());
                return this.cartService.clearCart().pipe(
                    map((baseResponse) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        return clearCartSuccess();
                    }),
                    catchError((error) => {
                        this.store.dispatch(hideSpinner());
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(clearCartFailure({ error: error }))
                    })
                )
            })
        )
    );

    constructor(private actions$: Actions, private cartService: CartService, private productService: ProductService, private userService: UserService, private store: Store<CartState>, private snackBar: MatSnackBar) { }
}
