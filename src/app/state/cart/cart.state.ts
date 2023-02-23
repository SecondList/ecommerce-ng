import { BaseResponse } from "src/app/models/base-response";

export interface CartState {
    carts: BaseResponse;
    error: any;
}

export const initialState: CartState = {
    carts: {},
    error: null
};
