import { CartItemType } from "types/cart.types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./mmkv"

export interface CartState {
  cartItems: Array<CartItemType> // product with quantity
  items: number
  reduceProduct: (productId: string) => void
  addProduct: (cartItem: CartItemType) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      items: 0,
      addProduct: (cartItem: CartItemType) =>
        set((state) => {
          state.items++
          const alreadyAdded = state.cartItems.find((item) => item.product.id === item.product.id)
          if (alreadyAdded) {
            // if product is already in the cart, update its quantity
            return {
              cartItems: state.cartItems.map((item) => {
                if (item.product.id === cartItem.product.id) {
                  return { ...item, quantity: item.quantity + 1 }
                }
                return item
              }),
            }
          } else {
            // append the new item
            return {
              cartItems: [...state.cartItems, cartItem],
            }
          }
        }),
      clearCart: () =>
        set(() => {
          return { cartItems: [] }
        }),
      reduceProduct: (productId: string) =>
        set((state) => {
          // if product is already in the cart, reduce its quantity
          return {
            cartItems: state.cartItems
              .map((cartItem) => {
                if (cartItem.product.id === productId) {
                  state.items--
                  return { ...cartItem, quantity: cartItem.quantity - 1 }
                }
                return cartItem
              })
              .filter((cartItem) => cartItem.quantity > 0),
          }
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
