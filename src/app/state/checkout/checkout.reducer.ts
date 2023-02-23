import { createReducer, on } from '@ngrx/store';
import { checkoutFailure, checkoutSuccess } from './checkout.actions';
import { initialState } from './checkout.state';

export const checkoutReducer = createReducer(
    initialState,
    on(checkoutSuccess, (state, { baseResponse }) => ({ ...state, checkout: baseResponse, error: null })),
    on(checkoutFailure, (state, { error }) => ({ ...state, error: error }))
);