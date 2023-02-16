import { BaseResponse } from "src/app/models/base-response";

export interface ProductState {
    products: BaseResponse;
    error: any
}

export const initialState: ProductState = {
    products: {},
    error: null
};