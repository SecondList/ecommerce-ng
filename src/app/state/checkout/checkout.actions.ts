import { createAction, props } from '@ngrx/store';
import { BaseResponse } from 'src/app/models/base-response';
import { Card } from 'src/app/models/card';

export const checkout = createAction(
    '[Checkout] Checkout',
    props<{ productIds: number[], firstName: string, lastName: string, receiptEmail: string, address1: string, city: string, state: string, postalCode: string, country: string, carrier: string, card: Card }>()
);
export const checkoutSuccess = createAction(
    '[Checkout] Checkout Success',
    props<{ baseResponse: BaseResponse }>()
);
export const checkoutFailure = createAction(
    '[Checkout] Checkout Failure',
    props<{ error: any }>()
);