import { createReducer, on } from "@ngrx/store";
import { createProductSuccess, createProductFailure, loadProductSuccess, loadProductFailure } from "./products.actions";
import { initialState } from "./products.state";


export const productReducer = createReducer(
    initialState,
    on(loadProductSuccess, (state, { baseResponse }) => ({ ...state, products: baseResponse, error: null })),
    // on(loadProductSuccess, (state, { baseResponse }) => {
    //     tap(product => console.log(product) );
    //     const formattedProducts = baseResponse.result.map((product: Product) => {
    //         return {
    //           ...product,
    //           title: 'aaa'
    //         };
    //       });

    //       // Update the state with the formatted products
    //       return {
    //         ...state,
    //         products: formattedProducts
    //       };
    // }),
    on(loadProductFailure, (state, { error }) => ({ ...state, error: error })),
    on(createProductSuccess, (state, { product }) => ({ ...state, products: { ...state.products, product }, error: null })),
    on(createProductFailure, (state, { error }) => ({ ...state, error: error })),
    //on(updateProduct, (state, { product }) => ({ ...state })),
    //on(deleteProduct, (state, { context }) => ({ ...state }))
);