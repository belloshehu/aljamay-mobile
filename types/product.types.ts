import { ImageSourcePropType } from "react-native"
import { ResponseType } from "types/response.types"

export interface ProductType {
  id: string
  name: string
  image: string
  thumbnails: string[]
  description: string
  price: number
  quantity: number
  discount: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductCategory {
  image: ImageSourcePropType
  name: string
}
export interface ProductResponseType extends ResponseType<ProductType[]> {
  data: ProductType[]
}

export interface SingleProductResponseType extends ResponseType<ProductType> {
  data: ProductType
}
