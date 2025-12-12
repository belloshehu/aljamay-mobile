import { ProductType } from "./product.types";
import { ResponseType } from "./response.types";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type PaymentMethod = "CREDIT_CARD" | "USSD" | "BANK_TRANSFER";
export type OrderStatus =
	| "PENDING"
	| "COMPLETED"
	| "CANCELLED"
	| "SHIPPED"
	| "DELIVERED";

export interface OrderType {
	id: string;
	userId: string;
	orderItems: OrderItemType[];
	shippingAddressId: string;
	paymentMethod: string;
	totalAmount: number;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	orderNumber: string;
	shippingCost?: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItemType {
	id: string;
	orderId: string;
	product: ProductType;
	quantity: number;
	price: number; // Price at the time of order
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderResponseType extends ResponseType<OrderType[]> {
	data: OrderType[];
}

export interface SingleOrderResponseType extends ResponseType<OrderType> {
	data: OrderType;
}
