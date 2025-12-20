import ProductServiceAPI from "@/services/api/product.services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../use-axios"
import Toast from "react-native-toast-message"
import { useOnline } from "@/context/OnlineProvider"
import { is } from "date-fns/locale"

// Create a new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: ProductServiceAPI.createProduct,
    onSuccess: () => {
      Toast.show({ type: "success", text2: "Product created" })
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error: any) => {
      Toast.show({ type: "error", text2: "Error creating product" })
    },
  })
}

export const useGetProducts = ({ limit = 20, offset = 0, search = "" }) => {
  const { publicRequest } = useAxios()
  const isOneline = useOnline()
  if (!isOneline) {
    Toast.show({
      type: isOneline ? "success" : "error",
      text1: isOneline ? "You are online" : "You have no internet connection!",
      text2: isOneline ? "You are back online" : "Check your connection",
    })
  }
  return useQuery({
    queryKey: ["products", { limit, offset, search }],
    queryFn: async () => ProductServiceAPI.getProducts({ limit, offset, search, publicRequest }),
  })
}

export const useGetProductById = (productId: string) => {
  const { publicRequest } = useAxios()
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => ProductServiceAPI.getSingleProduct({ productId, publicRequest }),
  })
}

export const useDeleteProduct = (productId: string) => {
  const queryClient = useQueryClient()
  // Ensure that the productId is provided
  if (!productId) {
    throw new Error("Product ID is required for deletion")
  }
  return useMutation({
    mutationKey: ["deleteProduct", productId],
    mutationFn: ProductServiceAPI.deleteProductById,
    onSuccess: () => {
      // Optionally, you can invalidate the product query to refetch the list of products
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
