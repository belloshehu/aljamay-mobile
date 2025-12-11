import { FC, useEffect, useMemo } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useAuth } from "@/context/AuthContext"
import { LoginScreen } from "./LoginScreen/LoginScreen"
import { useGetCartItems } from "@/hooks/service-hooks/cart.service.hooks"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { push, replace } from "expo-router/build/global-state/routing"
import { CartItem } from "@/components/shoppingCart/CartItem"
import Price from "@/components/product/Price"
import { $separator } from "./ProductScreen/ProductList"

// @demo replace-next-line export const ShoppingCartScreen: FC = function ShoppingCartScreen(
export const ShoppingCartScreen: FC = function ShoppingCartScreen() {
  const { themed } = useAppTheme()
  const { isAuthenticated } = useAuth()
  const { isLoading, data } = useGetCartItems()

  const addProduct = () => {
    replace("/")
  }

  const totalPrice = useMemo(() => {
    if (data) {
      return data?.reduce((prev, next) => prev + next.product.price * next.quantity, 0)
    }
    return 0
  }, [data])

  const totalDiscount = useMemo(() => {
    if (data) {
      return data?.reduce((prev, next) => prev + next.product.discount * next.quantity, 0)
    }
    return 0
  }, [data])

  const goToCheckout = () => {
    push("/shopping/checkout")
  }

  if (!isAuthenticated) return <LoginScreen />

  if (isLoading)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$topContainer, { justifyContent: "center", alignItems: "center" }])}>
          <ActivityIndicator size={"large"} />
          <Text tx="cart:loading" />
        </View>
      </Screen>
    )

  if (!data || data.length === 0)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View
          style={themed([
            $topContainer,
            { justifyContent: "center", alignItems: "center", gap: 5 },
          ])}
        >
          <Image
            source={require("@assets/images/cart.png")}
            width={50}
            height={50}
            style={themed($shoppingCart)}
          />
          <Text tx="cart:noItems" />
          <Button
            tx="cart:add"
            preset="filled"
            style={{ width: "100%", marginTop: 10 }}
            onPress={addProduct}
          />
        </View>
      </Screen>
    )
  return (
    <Screen preset="fixed" contentContainerStyle={{ ...$styles.flex1, padding: 0, margin: 0 }}>
      <View style={themed($topContainer)}>
        <View style={themed($header)}>
          <Text tx="cart:title" txOptions={{ count: data.length }} style={themed($titleText)} />
          <Price price={totalPrice} priceStyle={themed($priceText)} discount={totalDiscount} />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartItem {...item} key={item.id} />}
          ItemSeparatorComponent={() => <View style={themed($separator)} />}
        />
        <Button
          textStyle={themed($orderButtonText)}
          tx="productDetail:checkout"
          preset="reversed"
          style={themed($orderButton)}
          onPress={goToCheckout}
        />
      </View>
    </Screen>
  )
}

const $header: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
})

const $orderButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.background,
})

const $orderButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  borderRadius: spacing.xl,
  backgroundColor: colors.errorBackground,
  paddingHorizontal: spacing.xxl,
  width: "100%",
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.lg,
  gap: spacing.sm,
  paddingBottom: spacing.xs,
})

const $shoppingCart: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 300,
  width: 300,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  resizeMode: "contain",
  borderRadius: spacing.xxl,
})

const $priceText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.md,
  fontWeight: "500",
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 20,
  fontWeight: "500",
})
