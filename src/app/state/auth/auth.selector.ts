import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthEntity = createFeatureSelector<AuthState>(
    "authState"
);
export const retrieveToken = createSelector(
    selectAuthEntity,
    (state: AuthState) => state.token
);
export const retrieveAuthError = createSelector(
    selectAuthEntity,
    (state: AuthState) => state.error
);
export const selectIsRegistered = createSelector(
    selectAuthEntity,
    (state: AuthState) => state.registered
);