import { ProductType } from "./product.types"
import { ResponseType } from "./response.types"

export interface CartItemType {
  product: ProductType
  quantity: number
  id: string
}

export interface CartItemResponseType extends ResponseType<CartItemType[]> {
  data: CartItemType[]
}
