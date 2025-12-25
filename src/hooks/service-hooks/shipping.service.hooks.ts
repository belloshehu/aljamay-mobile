import ShippingServiceAPI from "@/services/api/shipping.services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Toast from "react-native-toast-message"
import { useAxios } from "../use-axios"

export const useGetAllShippingAdressesByUser = () => {
  const { protectedRequest } = useAxios()
  return useQuery({
    queryFn: async () => ShippingServiceAPI.getShippingAddressesByUser({ protectedRequest }),
    queryKey: ["shipping-address"],
  })
}

export const useGetShippingAdress = ({ shippingAddressId }: { shippingAddressId: string }) => {
  const { protectedRequest } = useAxios()
  return useQuery({
    queryFn: async () =>
      ShippingServiceAPI.getShippingAddress({ shippingAddressId, protectedRequest }),
    queryKey: ["shipping-address"],
  })
}

export const useGetDefaultShippingAddress = () => {
  const { protectedRequest } = useAxios()
  return useQuery({
    queryFn: async () => ShippingServiceAPI.getDefaultShippingAddress({ protectedRequest }),
    queryKey: ["shipping-address"],
  })
}

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ShippingServiceAPI.createShippingAddress,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Added shipping address",
      })

      queryClient.invalidateQueries({ queryKey: ["shipping-address"] })
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message || "Failed to add shipping address",
      })
    },
  })
}

export const useDeleteShippingAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ShippingServiceAPI.deleteShippingAddress,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Delete shipping address",
      })
      queryClient.invalidateQueries({ queryKey: ["shipping-address"] })
    },
    onError: (error: AxiosError) => {
      Toast.show({
        type: "error",
        text1: error.message || "Failed to delete shipping address",
      })
    },
  })
}

export const useUpdateShippingAddress = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ShippingServiceAPI.updateShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping-address"] })
      Toast.show({
        type: "success",
        text1: "Updated shipping address",
      })
    },
    onError: (error: AxiosError) => {
      Toast.show({
        type: "error",
        text1: "Update error",
        text2: error.message || "Failed to update shipping address",
      })
    },
  })
}
