import { createSelector } from "@ngrx/store";
import { ProductState } from "./products.state";

const selectBaseResponse = (state: ProductState) => state.products;

export const selectProductBaseResponseData = createSelector(
    selectBaseResponse,
    (products) => {
        return {products.result}
    }
);


