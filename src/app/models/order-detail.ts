import { Product } from "./product";

export interface OrderDetail {
    orderId: number;
    productId: number;
    orderQty: number;
    price: number;
    product: Product;
}