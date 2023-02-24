import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Order } from "src/app/models/order";
import { OrderDetail } from "src/app/models/order-detail";
import { CheckoutService } from "src/app/services/checkout.service";
import { ProductService } from "src/app/services/product.service";
import { resetCart } from "../cart/cart.actions";
import { hideSpinner, showSpinner } from "../loading-spinner/loading-spinner.actions";
import { loadOrderSuccess } from "../order/order.actions";
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
                        const formattedOrderDetails = baseResponse.result.orderDetails.map((orderDetail: OrderDetail) => {
                            const formattedProduct = {
                                ...orderDetail.product,
                                imagePath: `${this.productService.getApiUrl()}/image/${new URL(orderDetail.product.imagePath).pathname.split('/').pop()}`
                            }

                            return {
                                ...orderDetail,
                                product: formattedProduct
                            }
                        });

                        this.store.dispatch(hideSpinner());
                        this.store.dispatch(resetCart());
                        this.store.dispatch(loadOrderSuccess({
                            baseResponse: {
                                ...baseResponse,
                                result: [{
                                    ...baseResponse.result,
                                    orderDetails: formattedOrderDetails
                                }]
                            }
                        }));
                        this.snackBar.open(baseResponse.message!, 'Close', { duration: 3000 });
                        this.router.navigate([`/checkout/success/${baseResponse.result.orderId}`]);
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

    constructor(private actions$: Actions, private checkoutService: CheckoutService, private productService: ProductService, private store: Store<CheckoutState>, private router: Router, private snackBar: MatSnackBar) { }
}