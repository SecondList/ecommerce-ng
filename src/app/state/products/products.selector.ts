import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./products.state";

export const selectProductEntity = createFeatureSelector<ProductState>(
    "productState"
);
export const retrieveProductBaseResponse = createSelector(
    selectProductEntity,
    (state: ProductState) => state.products
);
export const retrieveProductError = createSelector(
    selectProductEntity,
    (state: ProductState) => state.error || state.products?.errors
)