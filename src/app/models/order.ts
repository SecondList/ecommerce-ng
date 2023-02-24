import { OrderDetail } from "./order-detail";
import { Payment } from "./payment";
import { Shipment } from "./shipment";

export interface Order {
    orderId: number;
    userId: number;
    totalPrice: number;
    orderStatus: Date;
    orderDetails: OrderDetail[];
    payment: Payment;
    shipment: Shipment;
}