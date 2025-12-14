import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
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
    product: { image, name, price, discount },
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
    mutate({ cartItemId, protectedRequest })
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
    <View style={themed($mainContainer)}>
      <View style={themed($wrapper)}>
        <Image src={image as any} alt={name} style={themed($image)} />
        <View>
          <Text text={name} style={themed($name)} />
          <Price price={price * count} discount={discount * count} />
        </View>
      </View>
      <Counter onDecrese={decrease} onIncrease={increase} count={count} />
      <PressableIcon
        icon="delete"
        containerStyle={themed($deleteButton)}
        disabled={isPending}
        onPress={handleDelete}
        color="black"
        size={24}
      />
    </View>
  )
}

const $deleteButton: ThemedStyle<ImageStyle> = ({}) => ({
  position: "absolute",
  top: 10,
  right: 10,
})

const $mainContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  padding: spacing.xs,
  backgroundColor: "#fff",
  borderRadius: spacing.md,
  paddingBottom: spacing.sm,
  gap: spacing.xs,
})

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  gap: spacing.sm,
  flexDirection: "row",
  position: "relative",
  alignItems: "center",
})

const $image: ThemedStyle<ImageStyle> = ({ spacing, colors }) => ({
  width: 150,
  height: 80,
  flex: 0.4,
  resizeMode: "cover",
  backgroundColor: colors.errorBackground,
})

const $name: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.md,
  fontWeight: "600",
  color: colors.errorBackground,
})
