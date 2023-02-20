import { createAction, props } from '@ngrx/store';
import { BaseResponse } from 'src/app/models/base-response';
import { Product } from 'src/app/models/product';

export const loadProduct = createAction(
    '[Product] Load Product',
    props<{ categoryId: any, pageSize: number, page: number }>()
);
export const loadProductSuccess = createAction(
    '[Product] Load Product Success',
    props<{ baseResponse: BaseResponse}>()
);
export const loadProductFailure = createAction(
    '[Product] Load Product Failure',
    props<{ error: any}>()
);
export const loadProductByCategory = createAction(
    '[Product] Load Product By Category',
    props<{ categoryId: number, pageSize: number, page: number }>()
);
export const loadProductByCategorySuccess = createAction(
    '[Product] Load Product By Category Success',
    props<{ baseResponse: BaseResponse}>()
);
export const loadProductByCategoryFailure = createAction(
    '[Product] Load Product By Category Failure',
    props<{ error: any}>()
);
export const addProduct = createAction(
    '[Product] Add Product',
    props<{ product: Product }>()
);
export const createProductSuccess = createAction(
    '[Product] Add Product Success',
    props<{ product: Product}>()
);
export const createProductFailure = createAction(
    '[Product] Add Product Failure',
    props<{ error: any}>()
);
export const updateProduct = createAction(
    '[Product] Update Product',
    props<{ product: Product }>()
);
export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{ productId: string }>
);
