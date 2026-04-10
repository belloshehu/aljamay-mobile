import { ActivityIndicator, FlatList, View, ViewStyle } from "react-native"
import { useGetOrders } from "@/hooks/service-hooks/order.service.hooks"
import { OrderListEmptyState } from "@/components/CustomEmptyState"
import { $separator } from "../ProductScreen/ProductList"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Screen } from "@/components/Screen"
import { $styles } from "@/theme/styles"
import { Text } from "@/components/Text"
import { FC, useMemo } from "react"
import { Order } from "./Order"
import LottieView from "lottie-react-native"
import { Button } from "@/components/Button"
import { router } from "expo-router"

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

  if (!data || data.length === 0)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$topContainer])}>
          <LottieView
            source={require("@assets/animations/delivery.json")}
            autoPlay
            loop
            style={themed($animation)}
          />
          <Text tx="order:emptyMany" style={{ textAlign: "center" }} />
          <Button
            tx="order:goToProducts"
            preset="filled"
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => {
              router.push("/")
            }}
          ></Button>
        </View>
      </Screen>
    )
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
  alignItems: "center",
  gap: spacing.sm,
  paddingBottom: spacing.xs,
})

const $animation: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 150,
  height: 150,
})

export default OrderListScreen
