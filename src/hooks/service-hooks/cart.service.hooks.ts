import CartServiceAPI from "@/services/api/cart.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Toast from "react-native-toast-message"
import { useAxios } from "../use-axios"
import { AxiosError } from "axios"

export const useGetCartItems = () => {
  const { protectedRequest } = useAxios()
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      return CartServiceAPI.getCartItems({ protectedRequest })
    },
  })
}

export const useAddToCart = (productId?: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CartServiceAPI.addToCart,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Item added to cart",
      })
      queryClient.invalidateQueries({ queryKey: ["cartItems"] })
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] })
      }
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Error adding to cart`,
        text2:
          error.response?.data.error || (error instanceof Error ? error.message : "Unknown error"),
      })
    },
  })
}

// remove item from cart
export const useRemoveFromCart = (productId?: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CartServiceAPI.removeFromCart,
    onSuccess: () => {
      Toast.show({
        type: "error",
        text1: "Item removed from cart",
      })
      queryClient.invalidateQueries({ queryKey: ["cartItems"] })
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] })
      }
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Error removing from cart: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    },
  })
}

// update cart item quantity
export const useUpdateCartItemQuantity = (productId?: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CartServiceAPI.updateCartItemQuantity,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Cart item quantity updated",
      })
      queryClient.invalidateQueries({ queryKey: ["cartItems"] })
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] })
      }
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Cart update error: `,
        text2:
          error.response?.data.error || (error instanceof Error ? error.message : "Unknown error"),
      })
    },
  })
}
