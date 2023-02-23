import { BaseResponse } from "src/app/models/base-response";

export interface CheckoutState {
    checkout: BaseResponse;
    error: any;
}

export const initialState: CheckoutState = {
    checkout: {},
    error: null
};
