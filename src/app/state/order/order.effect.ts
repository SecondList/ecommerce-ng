import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Order } from "src/app/models/order";
import { OrderDetail } from "src/app/models/order-detail";
import { ProductService } from "src/app/services/product.service";
import { UserService } from "src/app/services/user.service";
import { hideSpinner, showSpinner } from "../loading-spinner/loading-spinner.actions";
import { loadOrder, loadOrderFailure, loadOrderSuccess } from "./order.actions";
import { OrderState } from "./order.state";

@Injectable()
export class OrderEffect {
    loadOrder$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOrder),
            tap(() => {
                setTimeout(() => { this.store.dispatch(showSpinner()) })
            }),
            mergeMap(({ pageSize, page }) => {
                pageSize = isNaN(pageSize) ? 10 : pageSize;
                page = isNaN(page) ? 1 : page;

                return this.userService.getUserOrders(pageSize, page).pipe(
                    map((baseResponse) => {
                        const formattedOrders = baseResponse.result.map((order: Order) => {
                            const formattedOrderDetails = order.orderDetails.map((orderDetail: OrderDetail) => {
                                const formattedProduct = {
                                    ...orderDetail.product,
                                    imagePath: `${this.productService.getApiUrl()}/image/${new URL(orderDetail.product.imagePath).pathname.split('/').pop()}`
                                }

                                return {
                                    ...orderDetail,
                                    product: formattedProduct
                                }
                            });

                            return {
                                ...order,
                                orderDetails: formattedOrderDetails
                            }
                        });

                        // Update the state with the formatted products
                        return {
                            ...baseResponse,
                            result: formattedOrders,
                            page: page - 1
                        };
                    }),
                    map((baseResponse) => {
                        return loadOrderSuccess({ baseResponse: baseResponse });
                    }),
                    catchError((error) => {
                        this.snackBar.open(error!, 'Close', { duration: 5000 });
                        return of(loadOrderFailure({ error: error }))
                    })
                )
            }),
            tap(() => {
                setTimeout(() => { this.store.dispatch(hideSpinner()) })
            })
        )
    );

    constructor(private actions$: Actions, private userService: UserService, private productService: ProductService, private store: Store<OrderState>, private snackBar: MatSnackBar) { }
}
