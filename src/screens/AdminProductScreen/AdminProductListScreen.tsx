import { FC } from "react"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useAuth } from "@/context/AuthContext"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { push } from "expo-router/build/global-state/routing"
import { LoginScreen } from "../LoginScreen/LoginScreen"
import ProductList from "../ProductScreen/ProductList"
import { useGetProducts } from "@/hooks/service-hooks/product.service.hooks"
import Modal from "@/components/Modal"
import { AddProductModal } from "./AddProductModal"
import { translate } from "@/i18n/translate"

// @demo replace-next-line export const ShoppingCartScreen: FC = function ShoppingCartScreen(
export const AdminProductListScreen: FC = () => {
  const { themed } = useAppTheme()
  const { isAuthenticated } = useAuth()
  const { data, isLoading } = useGetProducts({})

  if (!isAuthenticated) return <LoginScreen />

  if (isLoading)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$topContainer, { justifyContent: "center", alignItems: "center" }])}>
          <ActivityIndicator size={"large"} />
          <Text tx="messageScreen:loadingMany" />
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
            source={require("@assets/images/message_bubble.png")}
            width={50}
            height={50}
            style={themed($shoppingCart)}
          />
          <Text tx="profileScreen:accountItem.admin.emptyProducts" />
          <Button
            tx="messageScreen:goToProfile"
            preset="filled"
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => push("/user")}
          />
        </View>
      </Screen>
    )
  return (
    <Screen preset="fixed" contentContainerStyle={{ ...$styles.flex1, padding: 0, margin: 0 }}>
      <View style={themed($topContainer)}>
        <View style={themed($header)}>
          <Text
            tx="productList:title"
            txOptions={{ count: data.length }}
            style={themed($titleText)}
            preset="subheading"
          />
          <Modal
            title={translate("productList:addProduct")}
            TriggerComponent={({ onPress }) => (
              <Button tx="productList:addProduct" preset="filled" onPress={onPress} />
            )}
            renderedModalChildren={<AddProductModal />}
            // renderedModalChildren={<AddProductModal />}
          />
        </View>
        <ProductList products={data} isLoading={isLoading} minimum />
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

const $titleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 20,
  fontWeight: "500",
})
