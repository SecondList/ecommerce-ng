import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
    //props<{ credentials: Credentials }>()
);
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ token: string }>()
);
export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);