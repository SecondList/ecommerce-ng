import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Order } from "src/app/models/order";
import { OrderState } from "./order.state";

export const selectOrderEntity = createFeatureSelector<OrderState>("orderState");
export const retrieveOrderBaseResponse = createSelector(
    selectOrderEntity,
    (state: OrderState) => state.orders
);
export const retrieveOrderError = createSelector(
    selectOrderEntity,
    (state: OrderState) => state.error || state.orders?.errors
);
export const selectOrder = (orderId: number) => createSelector(
    selectOrderEntity,
    (state: OrderState) => state.orders.result?.find((o: Order) => o.orderId === orderId)
);