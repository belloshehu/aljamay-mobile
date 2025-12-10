import { FC, useEffect } from "react"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { TextField } from "@/components/TextField"
import { Icon } from "@/components/Icon"
import { useAuth } from "@/context/AuthContext"
import { LoginScreen } from "./LoginScreen/LoginScreen"
import { useGetCartItems } from "@/hooks/service-hooks/cart.service.hooks"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { push, replace } from "expo-router/build/global-state/routing"
import { CartItem } from "@/components/shoppingCart/CartItem"

// @demo replace-next-line export const ShoppingCartScreen: FC = function ShoppingCartScreen(
export const ShoppingCartScreen: FC = function ShoppingCartScreen() {
  const { themed } = useAppTheme()
  const { isAuthenticated } = useAuth()
  const { isLoading, data } = useGetCartItems()

  const addProduct = () => {
    replace("/")
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
          <Icon icon="cart" size={50} />
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
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Text tx="cart:title" txOptions={{ count: data.length }} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartItem {...item} key={item.id} />}
        />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.lg,
})

const $ShoppingCartFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
