import { createReducer, on } from '@ngrx/store';
import { initialState } from '../products/products.state';
import { loginSuccess, loginFailure } from './auth.actions';

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { token }) => ({ ...state, token, error: null })),
    on(loginFailure, (state, { error }) => ({ ...state, error }))
);