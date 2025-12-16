import { ResponseType } from "./response.types"

export interface ProductCategoryType {
  id: string
  name: string
  image: string | null
  description: string | null
  createdAt?: Date
  updatedAt?: Date
  productIds: string[]
}

export interface ProductResponseType extends ResponseType<ProductCategoryType[]> {
  data: ProductCategoryType[]
}

export interface SingleProductResponseType extends ResponseType<ProductCategoryType> {
  data: ProductCategoryType
}
