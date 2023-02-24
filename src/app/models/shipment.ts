export interface Shipment {
    shipmentId: number;
    orderId: number;
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    receiptEmail: string;
    carrier: string;
    trackingNumber: string;
}