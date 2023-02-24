import { BaseResponse } from "src/app/models/base-response";

export interface OrderState {
    orders: BaseResponse;
    error: any;
}

export const initialState: OrderState = {
    orders: {},
    error: null
};
