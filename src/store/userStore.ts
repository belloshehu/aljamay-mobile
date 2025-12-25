import { OrderType } from "types/order.types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { zustandStorage } from "./user.mmkv"

export interface UserStoreType {
  messages: Array<Object & { id: string }>
  reviews: Array<Object>
  orders: OrderType[]
  addMessage: (message: Object & { id: string }) => void
  removeMessage: (id: string) => void
}

export const useUserStore = create<UserStoreType>()(
  persist(
    (set, get) => ({
      messages: [],
      reviews: [],
      orders: [],
      addMessage: (message: Object & { id: string }) =>
        set((state) => {
          return { messages: [...state.messages, message] }
        }),
      removeMessage: (id: string) =>
        set((state) => {
          return {
            messages: state.messages?.filter((message) => message.id !== id),
          }
        }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
