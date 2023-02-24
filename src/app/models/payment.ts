export interface Payment {
    paymentId: number;
    orderId: number;
    amount: number;
    paymentMethod: string;
    status: number;
    paymentDate: Date;
}