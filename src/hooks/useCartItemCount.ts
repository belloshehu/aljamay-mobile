import Config from "@/config"
import { useStepChange } from "./useCount"
import { useAxios } from "./use-axios"
import { useUpdateCartItemQuantity } from "./service-hooks/cart.service.hooks"

const useCartItemCount = (cartItemId: string, quantity: number) => {
  const {
    step: count,
    stepDecrease,
    stepIncrease,
  } = useStepChange({
    defaultValue: quantity,
    lowerLimit: 1,
    upperLimit: Config.MAX_CART_ITEM,
  })

  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItemQuantity()
  const { protectedRequest } = useAxios()

  const increase = () => {
    updateQuantity({ quantity: count + 1, cartItemId, protectedRequest })
    stepIncrease()
  }

  const decrease = () => {
    if (count > 1) {
      updateQuantity({ quantity: count - 1, cartItemId, protectedRequest })
    }
    stepDecrease()
  }

  return {
    count,
    increase,
    decrease,
    isUpdating,
  }
}

export default useCartItemCount
