import { AxiosInstance } from "axios"
import { OrderResponseType, SingleOrderResponseType } from "types/order.types"

class OrderServiceAPI {
  // This service handles order-related API calls
  static async getOrders({ protectedRequest }: { protectedRequest: AxiosInstance }) {
    const { data } = await protectedRequest.get<OrderResponseType>("/order")
    return data.data
  }

  // This method creates a new order with the provided details
  static async createOrder({
    protectedRequest,
    cartItems,
    shippingAddressId,
    paymentMethod,
    totalAmount,
  }: {
    cartItems: string[]
    shippingAddressId: string
    paymentMethod: string
    totalAmount: number
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.post<SingleOrderResponseType>("/order", {
      cartItems,
      shippingAddressId,
      paymentMethod,
      totalAmount,
    })
    return data.data
  }

  static async getOrderById({
    orderId,
    protectedRequest,
  }: {
    orderId: string
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.get<SingleOrderResponseType>(`/order/${orderId}`)
    return data.data
  }

  static async updateOrderStatus({
    orderId,
    status,
    protectedRequest,
  }: {
    orderId: string
    status: string
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.patch(`/order/${orderId}`, {
      status,
    })
    return data.data
  }
}

export default OrderServiceAPI
