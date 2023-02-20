import { createAction, props } from "@ngrx/store";
import { BaseResponse } from "src/app/models/base-response";

export const loadProductCategory = createAction(
    '[Product Category] Load Category'
);
export const loadProductCategorySuccess = createAction(
    '[Product Category] Load Category Success',
    props<{ baseResponse: BaseResponse }>()
);
export const loadProductCategoryFailure = createAction(
    '[Product Category] Load Category Failure',
    props<{ error: any }>()
);