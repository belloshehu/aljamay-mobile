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

  static async getSingleProduct({
    publicRequest,
    productId,
  }: {
    productId: string
    publicRequest: AxiosInstance
  }) {
    const { data } = await publicRequest.get<SingleProductResponseType>("/product/" + productId)
    return data.data
  }

  static async deleteProductById({
    protectedRequest,
    productId,
  }: {
    productId: string
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.delete<SingleProductResponseType>(
      "/product/" + productId,
    )
    return data.data
  }
}

export default ProductServiceAPI
