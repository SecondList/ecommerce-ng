import { BaseResponse } from "src/app/models/base-response";

export interface ProductCategoryState {
    productCategories: BaseResponse;
    error: any
}

export const initialState: ProductCategoryState = {
    productCategories: {},
    error: null
};