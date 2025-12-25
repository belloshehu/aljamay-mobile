import axios, { AxiosInstance } from "axios"
import { CartItemResponseType } from "types/cart.types"

class CartServiceAPI {
  static async getCartItems({ protectedRequest }: { protectedRequest: AxiosInstance }) {
    const { data } = await protectedRequest.get<CartItemResponseType>("/cart")
    return data.data
  }

  static async addToCart({
    protectedRequest,
    productId,
    quantity,
  }: {
    productId: string
    quantity: number
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.post("/cart", {
      productId,
      quantity,
    })
    return data.data
  }

  static async removeFromCart({
    protectedRequest,
    cartItemId,
  }: {
    protectedRequest: AxiosInstance
    cartItemId: string
  }) {
    const { data } = await protectedRequest.delete(`/cart/${cartItemId}`)
    return data.data
  }

  static async updateCartItemQuantity({
    protectedRequest,
    cartItemId,
    quantity,
  }: {
    protectedRequest: AxiosInstance
    cartItemId: string
    quantity: number
  }) {
    const { data } = await protectedRequest.patch(`/cart/${cartItemId}`, {
      quantity,
    })
    return data.data
  }

  static async clearCart() {
    const { data } = await axios.delete("/ cart")
    return data.data
  }
}

export default CartServiceAPI
