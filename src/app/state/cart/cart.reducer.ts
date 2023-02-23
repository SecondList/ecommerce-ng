import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/models/cart';
import { initialState } from '../cart/cart.state';
import { clearCartFailure, clearCartSuccess, createCartFailure, createCartSuccess, deleteCartFailure, deleteCartSuccess, loadCartFailure, loadCartSuccess, updateCartFailure, updateCartSuccess, updateSelectedCart } from './cart.actions';

export const cartReducer = createReducer(
    initialState,
    on(loadCartSuccess, (state, { baseResponse }) => ({ ...state, carts: baseResponse, error: null })),
    on(loadCartFailure, (state, { error }) => ({ ...state, error: error })),
    on(createCartSuccess, (state, { cart }) => ({ ...state, error: null })),
    on(createCartFailure, (state, { error }) => ({ ...state, error: error })),
    on(updateCartSuccess, (state, { baseResponse }) => {
        const formattedCarts = state.carts.result.map((cart: Cart) => {
            if (cart.productId === baseResponse.result.productId) {
                return {
                    ...cart,
                    orderQty: baseResponse.result.orderQty
                };
            }

            return cart;
        });

        return {
            ...state,
            carts: {
                ...state.carts,
                result: formattedCarts
            },
            error: null
        }
    }),
    on(updateCartFailure, (state, { error }) => ({ ...state, error: error })),
    // on(deleteCartSuccess, (state, { productId }) => ({
    //     ...state,
    //     carts: {
    //         ...state.carts,
    //         result: (state.carts.result.filter((c: { productId: number; }) => c.productId !== productId)),
    //         resultCount: state.carts.resultCount,
    //         totalCount: state.carts.totalCount

    //     },
    //     error: null
    // })),
    on(deleteCartFailure, (state, { error }) => ({ ...state, error: error })),
    on(clearCartSuccess, (state) => ({ ...state, carts: {}, error: null })),
    on(clearCartFailure, (state, { error }) => ({ ...state, error: error })),
    on(updateSelectedCart, (state, { selectedCarts }) => {
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
        const formattedCarts = state.carts.result.map((cart: Cart) => {
            const formattedCart = selectedCarts.find((c: any) => c.productId === cart.productId);
            return formattedCart ? { ...cart, selected: true } : { ...cart, selected: false };
        });
        return {
            ...state,
            carts: {
                ...state.carts,
                result: formattedCarts
            },
            error: null
        };
    })
);