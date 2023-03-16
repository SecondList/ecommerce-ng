import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "src/app/models/product";
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
);
export const selectProduct = (productId: number) => createSelector(
    selectProductEntity,
    (state: ProductState) => state.products.result?.find((p: Product) => p.productId === productId)
);