import { FC, useMemo } from "react"
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
import { $separator } from "../ProductScreen/ProductList"
import { useGetOrders } from "@/hooks/service-hooks/order.service.hooks"
import { Order } from "./Order"
import withAuth from "@/components/HOC/withAuth"
import { OrderListEmptyState } from "@/components/CustomEmptyState"

const OrderListScreen: FC = () => {
  const { themed } = useAppTheme()
  const { isLoading, data, refetch } = useGetOrders()

  const totalAmount = useMemo(() => {
    if (data) {
      return data?.reduce((prev, next) => prev + next.totalAmount, 0)
    }
    return 0
  }, [data])

  if (isLoading)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$topContainer, { justifyContent: "center", alignItems: "center" }])}>
          <ActivityIndicator size={"large"} />
          <Text tx="order:loadingMany" />
        </View>
      </Screen>
    )

  if (!data || data.length === 0) return <OrderListEmptyState buttonOnPress={refetch} />
  return (
    <Screen preset="fixed" contentContainerStyle={{ ...$styles.flex1, padding: 0, margin: 0 }}>
      <View style={themed($topContainer)}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Order {...item} key={item.id} isLoading={isLoading} />}
          ItemSeparatorComponent={() => <View style={themed($separator)} />}
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

export default withAuth(OrderListScreen)
