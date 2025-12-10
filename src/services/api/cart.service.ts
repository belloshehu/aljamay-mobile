import axios, { AxiosInstance } from "axios"
import { CartItemResponseType } from "types/cart.types"

class CartServiceAPI {
  static async getCartItems({ protectedRequest }: { protectedRequest: AxiosInstance }) {
    const { data } = await protectedRequest.get<CartItemResponseType>("/cart")
    return data.data
  }

  static async addToCart({ productId, quantity }: { productId: string; quantity: number }) {
    const { data } = await axios.post("/api/cart", {
      productId,
      quantity,
    })
    return data.data
  }

  static async removeFromCart({
    protectedRequest,
    productId,
  }: {
    protectedRequest: AxiosInstance
    productId: string
  }) {
    const { data } = await protectedRequest.delete(`/api/cart/${productId}`)
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
    const { data } = await protectedRequest.patch(`/api/cart/${cartItemId}`, {
      quantity,
    })
    return data.data
  }

  static async clearCart() {
    const { data } = await axios.delete("/api/cart")
    return data.data
  }
}

export default CartServiceAPI
