import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Cart } from "src/app/models/cart";
import { CartState } from "./cart.state";

export const selectCartEntity = createFeatureSelector<CartState>("cartState");
export const retrieveCartBaseResponse = createSelector(
    selectCartEntity,
    (state: CartState) => state.carts
);
export const retrieveCartError = createSelector(
    selectCartEntity,
    (state: CartState) => state.error || state.carts?.errors
);
export const retrieveCartOrderQty = (productId: number) => createSelector(
    selectCartEntity,
    (state: CartState) => state.carts.result?.find((c: Cart) => c.productId === productId)?.orderQty

);
export const retrieveCart = (productId: number) => createSelector(
    selectCartEntity,
    (state: CartState) => state.carts.result?.find((c: Cart) => c.productId === productId)
);
export const selectPage = createSelector(
    selectCartEntity,
    (state: CartState) => state.carts.page
);
export const selectCheckOutCart = createSelector(
    selectCartEntity,
    (state: CartState) => state.carts.result.filter((cart: Cart) => cart.selected === true)
);