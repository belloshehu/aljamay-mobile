import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { CartItemType } from "types/cart.types"
import { Text } from "../Text"
import Price from "../product/Price"
import { Counter } from "../Counter"
import { useStepChange } from "@/hooks/useCount"
import Config from "@/config"
import { PressableIcon } from "../Icon"
import {
  useRemoveFromCart,
  useUpdateCartItemQuantity,
} from "@/hooks/service-hooks/cart.service.hooks"
import { useAxios } from "@/hooks/use-axios"

interface CartItemProps extends CartItemType {}

export const CartItem: FC<CartItemProps> = (props: CartItemProps) => {
  const { themed } = useAppTheme()
  const { mutate, isPending } = useRemoveFromCart()
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItemQuantity()
  const {
    product: { image, name, price, discount, id },
    quantity,
    id: cartItemId,
  } = props
  const {
    step: count,
    stepDecrease,
    stepIncrease,
  } = useStepChange({
    defaultValue: quantity,
    lowerLimit: 1,
    upperLimit: Config.MAX_CART_ITEM,
  })

  const { protectedRequest } = useAxios()
  const handleDelete = () => {
    mutate({ productId: id, protectedRequest })
  }

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

  return (
    <View style={themed($wrapper)}>
      <PressableIcon
        icon="delete"
        style={themed($deleteButton)}
        disabled={isPending}
        onPress={handleDelete}
      />
      <Image source={image as any} alt={name} style={themed($image)} />
      <View>
        <Text text={name} />
        <Price price={price * count} discount={discount} />
        <Counter onDecrese={decrease} onIncrease={increase} count={count} />
      </View>
    </View>
  )
}

const $deleteButton: ThemedStyle<ImageStyle> = ({}) => ({
  position: "absolute",
  right: 10,
  top: 10,
})

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  gap: spacing.sm,
  flexDirection: "row",
})

const $image: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  borderTopLeftRadius: spacing.md,
  borderTopRightRadius: spacing.md,
  width: "100%",
  height: 150,
})
