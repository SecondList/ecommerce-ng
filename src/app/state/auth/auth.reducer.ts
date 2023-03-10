import { createReducer, on } from '@ngrx/store';
import { initialState } from '../auth/auth.state';
import { loginSuccess, loginFailure, registerSuccess, registerFailure, logoutSuccess } from './auth.actions';

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { token, refreshToken }) => ({ ...state, token: token, refreshToken: refreshToken, isAuthenticated: true, error: null })),
    on(loginFailure, (state, { error }) => ({ ...state, token: '', refreshToken: '', isAuthenticated: false, error: error })),
    on(logoutSuccess, (state) => ({ ...state, token: '', refreshToken: '', isAuthenticated: false, error: '' })),
    on(registerSuccess, (state) => ({ ...state, registered: true, error: null })),
    on(registerFailure, (state, { error }) => ({ ...state, registered: false, refreshToken: '', error: error })),
);