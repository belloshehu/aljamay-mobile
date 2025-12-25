import { FC } from "react"
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
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { push, replace } from "expo-router/build/global-state/routing"
import Price from "@/components/product/Price"
import { $separator } from "../ProductScreen/ProductList"
import { useGetOrderById } from "@/hooks/service-hooks/order.service.hooks"
import { useLocalSearchParams } from "expo-router"
import { OrderItem } from "../OrderScreen/OrderItem"
import { formatDate } from "@/utils/formatDate"
import { ShippingAddress } from "../CheckoutScreen/ShippingAddress"
import { colors } from "@/theme/colors"

// @demo replace-next-line export const ShoppingCartScreen: FC = function ShoppingCartScreen(
export const OrderDetailScreen: FC = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>()
  const { themed, theme } = useAppTheme()
  const { isLoading, data: order } = useGetOrderById(orderId)

  if (!orderId) replace("/user/orders")

  if (isLoading)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$topContainer, { justifyContent: "center", alignItems: "center" }])}>
          <ActivityIndicator size={"large"} />
          <Text tx="order:loadingOne" />
        </View>
      </Screen>
    )
  if (!order || !orderId)
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
          <Text tx="order:emptyMany" />
          <Button
            tx="order:goToCart"
            preset="filled"
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => push("/shopping")}
          />
        </View>
      </Screen>
    )

  return (
    <Screen preset="fixed" contentContainerStyle={{ ...$styles.flex1, padding: 0, margin: 0 }}>
      <View style={themed($topContainer)}>
        <View style={themed($header)}>
          <Text
            tx="order:orderHeading"
            txOptions={{ date: formatDate(order.createdAt?.toString()!) }}
            style={[themed($titleText)]}
            preset="subheading"
          />
        </View>

        <View
          style={[
            themed($header),
            {
              borderWidth: 1,
              padding: 10,
              borderColor: theme.colors.errorBackground,
              backgroundColor: colors.errorBackground,
            },
          ]}
        >
          <Text text={order.status} style={[{ fontSize: 18, width: "40%" }]} />
          <Price price={order.totalAmount} priceStyle={themed($priceText)} />
        </View>
        <View>
          <Text tx="checkout:shippingAddress.title" />
          <ShippingAddress shippingData={order?.shippingAddress} />
        </View>
        <FlatList
          ListHeaderComponent={() => (
            <Text tx="order:itemsCount" txOptions={{ count: order.orderItems.length }} />
          )}
          data={order.orderItems}
          keyExtractor={(item) => item.product.id}
          renderItem={({ item }) => <OrderItem data={item} />}
          ItemSeparatorComponent={() => <View style={themed($separator)} />}
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
  fontSize: spacing.lg,
  fontWeight: "500",
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 20,
  fontWeight: "500",
})
