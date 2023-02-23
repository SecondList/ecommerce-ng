import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Cart } from "src/app/models/cart";
import { CheckoutState } from "./checkout.state";

export const selectCheckoutEntity = createFeatureSelector<CheckoutState>("checkoutState");
export const retrieveCheckoutBaseResponse = createSelector(
    selectCheckoutEntity,
    (state: CheckoutState) => state.checkout
);
export const retrieveCheckoutError = createSelector(
    selectCheckoutEntity,
    (state: CheckoutState) => state.error || state.checkout?.errors
);