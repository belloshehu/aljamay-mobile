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
    refetchOnWindowFocus: true, // Optional: Prevent refetching on window focus
    // staleTime: 1000 * 60 * 5, // Optional: Cache for 5 minutes
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CartServiceAPI.addToCart,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Item added to cart",
      })
      queryClient.invalidateQueries({ queryKey: ["cartItems"] })
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Error adding to cart: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    },
  })
}

// remove item from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CartServiceAPI.removeFromCart,
    onSuccess: () => {
      Toast.show({
        type: "error",
        text1: "Item removed from cart",
      })
      queryClient.invalidateQueries({ queryKey: ["cartItems"] })
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
export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CartServiceAPI.updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] })
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Error updating cart item quantity: `,
        text2: error.response?.data.error,
      })
    },
  })
}
