import { Product } from "./product";

export interface Cart {
    id: number;
    productId: number;
    orderQty: number;
    createdAt: Date;
    product: Product;
    selected: boolean;
}