import OrderServiceAPI from "@/services/api/order.services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Toast from "react-native-toast-message"
import { useAxios } from "../use-axios"
import { replace } from "expo-router/build/global-state/routing"

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: OrderServiceAPI.createOrder,
    onSuccess: () => {
      Toast.show({ type: "success", text2: "Order created" })
      queryClient.invalidateQueries({ queryKey: ["orders", "cartItems"] })
      replace("/user/orders")
    },
    onError: () => {
      Toast.show({ type: "error", text2: "Error creating order" })
    },
  })
}

export const useGetOrders = () => {
  const { protectedRequest } = useAxios()
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => OrderServiceAPI.getOrders({ protectedRequest }),
  })
}

export const useGetOrderById = (orderId: string) => {
  const { protectedRequest } = useAxios()
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => OrderServiceAPI.getOrderById({ orderId, protectedRequest }),
  })
}

export const useUpdateOrderStatus = (orderId: string) => {
  const queryClient = useQueryClient()

  if (!orderId) {
    throw new Error("Order ID is required for updating status")
  }

  return useMutation({
    mutationFn: OrderServiceAPI.updateOrderStatus,
    onSuccess: () => {
      Toast.show({ type: "success", text2: "Order updated" })
      queryClient.invalidateQueries({ queryKey: ["orders", orderId] })
    },
    onError: () => {
      Toast.show({ type: "error", text2: "Error updating order" })
    },
  })
}
