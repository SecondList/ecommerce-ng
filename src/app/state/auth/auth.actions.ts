import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
    //props<{ credentials: Credentials }>()
);
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ token: string, refreshToken: string }>()
);
export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);
export const logout = createAction(
    '[Auth] Logout'
);
export const register = createAction(
    '[Auth] Register',
    props<{ email: string, password: string, confirmPassword: string }>()
)
export const registerSuccess = createAction(
    '[Auth] Register Success'
)
export const registerFailure = createAction(
    '[Auth] Register Fail',
    props<{ error: any }>()
)