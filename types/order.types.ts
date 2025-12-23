import { ProductType } from "./product.types"
import { ResponseType } from "./response.types"
import { ShippingAddressType } from "./shipping.types"

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED"
export type PaymentMethod = "CREDIT_CARD" | "USSD" | "BANK_TRANSFER"

export interface OrderType {
  id: string
  userId: string
  orderItems: OrderItemType[]
  shippingAddressId: string
  shippingAddress: ShippingAddressType
  paymentMethod: string | null
  totalAmount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingCost?: number
  createdAt?: Date
  updatedAt?: Date
}

enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  CANCELLED,
}

export interface OrderItemType {
  id: string
  orderId: string
  product: ProductType
  quantity: number
  price: number // Price at the time of order
  createdAt?: Date
  updatedAt?: Date
  orderNumber: string
}

export interface OrderResponseType extends ResponseType<OrderType[]> {
  data: OrderType[]
}

export interface SingleOrderResponseType extends ResponseType<OrderType> {
  data: OrderType
}
