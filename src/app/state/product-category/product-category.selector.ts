import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ProductCategoryState } from "./product-category.state";

export const selectProductCategoryEntity = createFeatureSelector<ProductCategoryState>(
    "productCategoryState"
);
export const retrieveProdductCategories = createSelector(
    selectProductCategoryEntity,
    (state: ProductCategoryState) => state.productCategories.result
);