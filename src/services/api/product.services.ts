import axios, { AxiosInstance } from "axios"
import { ProductResponseType, SingleProductResponseType } from "types/product.types"

class ProductServiceAPI {
  static async getProducts({
    publicRequest,
    limit = 20,
    offset = 0,
    search = "",
  }: {
    publicRequest: AxiosInstance
    limit?: number
    offset?: number
    search?: string
  }) {
    const { data } = await publicRequest.get<ProductResponseType>("/product", {
      params: { limit, offset, search },
    })
    return data.data
  }

  static async getSingleProduct({ productId }: { productId: string }) {
    const { data } = await axios.get<SingleProductResponseType>("/api/product/" + productId)
    return data.data
  }

  static async deleteProductById({ productId }: { productId: string }) {
    const { data } = await axios.delete<SingleProductResponseType>("/api/product/" + productId)
    return data.data
  }
}

export default ProductServiceAPI
