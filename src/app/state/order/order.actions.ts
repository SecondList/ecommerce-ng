import { createAction, props } from '@ngrx/store';
import { BaseResponse } from 'src/app/models/base-response';

export const loadOrder = createAction(
    '[Order] Load Order',
    props<{ pageSize: number, page: number }>()
);
export const loadOrderSuccess = createAction(
    '[Order] Load Order Success',
    props<{ baseResponse: BaseResponse }>()
);
export const loadOrderFailure = createAction(
    '[Order] Load Order Failure',
    props<{ error: any }>()
);