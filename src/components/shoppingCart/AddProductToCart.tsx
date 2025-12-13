import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { BottomSheetChildrenProps } from "types/bottom-sheet.types"
import { Button } from "../Button"
import { ProductType } from "types/product.types"
import Price from "../product/Price"
import Config from "@/config"
import { useStepChange } from "@/hooks/useCount"
import { Counter } from "../Counter"
import { useAddToCart } from "@/hooks/service-hooks/cart.service.hooks"
import { useAxios } from "@/hooks/use-axios"

/*
  Component with - and + buttons to add certain number of product to shopping cart
  
  props:
    - (optional) bottomSheet close handler when the component is children of a bottomsheet
 */
interface AddProductToCartProps extends BottomSheetChildrenProps {
  product: ProductType
}

const AddProductToCart: FC<AddProductToCartProps> = (props: AddProductToCartProps) => {
  const { themed } = useAppTheme()
  const { handleBottomSheetClose, product } = props
  const { mutateAsync, isPending } = useAddToCart()
  const { protectedRequest } = useAxios()
  const {
    stepDecrease,
    stepIncrease,
    step: count,
  } = useStepChange({ defaultValue: 1, lowerLimit: 1, upperLimit: Config.MAX_CART_ITEM })

  const addToCart = async () => {
    await mutateAsync({ productId: product.id, quantity: count, protectedRequest })
    handleBottomSheetClose && handleBottomSheetClose()
  }

  return (
    <View style={themed($container)}>
      <Price price={product.price * count} priceStyle={themed($priceTextStyle)} />
      <Counter count={count} onDecrese={stepDecrease} onIncrease={stepIncrease} />
      <Button
        tx="productDetail:cart"
        onPress={addToCart}
        preset="filled"
        style={{ width: "100%" }}
        disabled={isPending}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxl,
  paddingHorizontal: spacing.lg,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
})

const $priceTextStyle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontWeight: "bold",
  textAlign: "center",
  fontSize: spacing.lg,
  color: colors.errorBackground,
})

const $countWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
})

export default AddProductToCart
