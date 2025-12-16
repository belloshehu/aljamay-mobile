import { ProductCreateValidationSchemaType } from "@/schemas/product.validation.schema"
import axios, { AxiosInstance } from "axios"
import { ProductResponseType, SingleProductResponseType } from "types/product.types"

class ProductServiceAPI {
  // Create a new product
  static async createProduct({
    protectedRequest,
    payload,
  }: {
    payload: ProductCreateValidationSchemaType
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.post<SingleProductResponseType>("/product", payload)
    return data.data
  }

  // Get all products with pagination and search
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

  // Get single product by id
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

  // Update product by id
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
