import { createReducer, on } from '@ngrx/store';
import { initialState } from '../order/order.state';
import { loadOrderFailure, loadOrderSuccess } from './order.actions';

export const orderReducer = createReducer(
    initialState,
    on(loadOrderSuccess, (state, { baseResponse }) => ({ ...state, orders: baseResponse, error: null })),
    on(loadOrderFailure, (state, { error }) => ({ ...state, error: error }))
);