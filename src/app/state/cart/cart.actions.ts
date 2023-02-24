import { createAction, props } from '@ngrx/store';
import { BaseResponse } from 'src/app/models/base-response';
import { Cart } from 'src/app/models/cart';

export const loadCart = createAction(
    '[Cart] Load Cart',
    props<{ pageSize: number, page: number }>()
);
export const loadCartSuccess = createAction(
    '[Cart] Load Cart Success',
    props<{ baseResponse: BaseResponse }>()
);
export const loadCartFailure = createAction(
    '[Cart] Load Cart Failure',
    props<{ error: any }>()
);
export const createCart = createAction(
    '[Cart] Add Cart',
    props<{ productId: number, orderQty: number }>()
);
export const createCartSuccess = createAction(
    '[Cart] Add Cart Success',
    props<{ cart: Cart }>()
);
export const createCartFailure = createAction(
    '[Cart] Add Cart Failure',
    props<{ error: any }>()
);
export const updateCart = createAction(
    '[Cart] Update Cart',
    props<{ productId: number, orderQty: number }>()
);
export const updateCartSuccess = createAction(
    '[Cart] Update Cart Success',
    props<{ baseResponse: BaseResponse }>()
);
export const updateCartFailure = createAction(
    '[Cart] Update Cart Failure',
    props<{ error: any }>()
);
export const deleteCart = createAction(
    '[Cart] Delete Cart',
    props<{ productId: number }>()
);
export const deleteCartSuccess = createAction(
    '[Cart] Delete Cart Success',
    props<{ productId: number }>()
);
export const deleteCartFailure = createAction(
    '[Cart] Delete Cart Failure',
    props<{ error: any }>()
);
export const clearCart = createAction(
    '[Cart] Clear Cart'
);
export const clearCartSuccess = createAction(
    '[Cart] Clear Cart Success'
);
export const clearCartFailure = createAction(
    '[Cart] Clear Cart Failure',
    props<{ error: any }>()
);
export const updateSelectedCart = createAction(
    '[Cart] Update Selected Cart',
    props<{ selectedCarts: any }>()
);
export const resetCart = createAction(
    '[Cart] Chekcout Success'
);