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
import { useAddToCart, useUpdateCartItemQuantity } from "@/hooks/service-hooks/cart.service.hooks"
import { useAxios } from "@/hooks/use-axios"
import { useAuth } from "@/context/AuthContext"
import { Text } from "../Text"
import { push } from "expo-router/build/global-state/routing"
import { useCartStore } from "@/store/cartStore"
import { Icon } from "../Icon"
import { is } from "date-fns/locale"
import Loader from "../Loader"

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
  const { mutateAsync, isPending } = useAddToCart(product.id)
  const { mutateAsync: updateCartItem, isPending: isPendingCartItemUpdate } =
    useUpdateCartItemQuantity(product.id)

  const addProductToCart = useCartStore((state) => state.addProduct)
  const { protectedRequest } = useAxios()
  const { isAuthenticated } = useAuth()
  const {
    stepDecrease,
    stepIncrease,
    step: count,
  } = useStepChange({
    defaultValue: product?.cartItems[0]?.quantity || 1,
    lowerLimit: 0,
    upperLimit: Config.MAX_CART_ITEM,
  })

  const productQuantityInCart = product?.cartItems[0]?.quantity || 0
  const addToCart = async () => {
    if (product.cartItems[0] && productQuantityInCart > 0) {
      await updateCartItem({
        quantity: count,
        cartItemId: product.cartItems[0].id,
        protectedRequest,
      })
        .then(() => {
          addProductToCart({
            id: product.id,
            product,
            quantity: count,
          })
        })
        .catch((error) => console.log(error))
    } else {
      await mutateAsync({ productId: product.id, quantity: count, protectedRequest })
        .then(() => {
          addProductToCart({
            id: product.id,
            product,
            quantity: count,
          })
        })
        .catch((error) => console.log(error))
    }
    handleBottomSheetClose && handleBottomSheetClose()
  }
  if (!isAuthenticated)
    return (
      <View style={{ gap: 15 }}>
        <Text>You need to login to add product to shopping cart</Text>
        <Button
          tx="signupScreen:goToLogin"
          preset="filled"
          textStyle={{ color: "#000" }}
          onPress={() => push("/user/login")}
        />
      </View>
    )

  return (
    <View style={themed($container)}>
      <Price price={product.price * count} priceStyle={themed($priceTextStyle)} />
      <Counter count={count} onDecrese={stepDecrease} onIncrease={stepIncrease} />
      {isPendingCartItemUpdate || isPending ? (
        <Loader loadingText="progress:wait" />
      ) : (
        <Button
          tx={productQuantityInCart > 0 ? "productDetail:updateCart" : "productDetail:cart"}
          onPress={addToCart}
          preset="filled"
          style={{ width: "100%" }}
          disabled={isPending}
          LeftAccessory={() => <Icon icon="cart" style={{ marginRight: 10 }} />}
        />
      )}
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

export default AddProductToCart
