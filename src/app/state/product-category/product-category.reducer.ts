import { createReducer, on } from "@ngrx/store";
import { loadProductCategorySuccess, loadProductCategoryFailure } from "./product-category-actions";
import { initialState } from "./product-category.state";


export const productCategoryReducer = createReducer(
    initialState,
    on(loadProductCategorySuccess, (state, { baseResponse }) => ({ ...state, productCategories: baseResponse, error: null })),
    on(loadProductCategoryFailure, (state, { error }) => ({ ...state, error: error }))
);