import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import { OrderType } from "types/order.types"
import Loader from "@/components/Loader"
import { OrderItem } from "./OrderItem"
import Price from "@/components/product/Price"
import { formatDate } from "@/utils/timedate"
import { PressableIcon } from "@/components/Icon"
import { push } from "expo-router/build/global-state/routing"

interface OrderProps extends OrderType {
  isLoading: boolean
}

export const Order: FC<OrderProps> = (props: OrderProps) => {
  const { themed } = useAppTheme()
  const { orderItems, totalAmount, isLoading, createdAt, status, id } = props
  if (isLoading) <Loader loadingText="order:loadingMany" />

  if (!orderItems || orderItems?.length === 0) return null
  return (
    <View style={themed($mainContainer)}>
      <Pressable style={themed($header)}>
        <Text
          tx="order:orderHeading"
          txOptions={{ date: formatDate(createdAt?.toString()!) }}
          style={{ fontSize: 12 }}
        />
        <Price price={totalAmount} />
        <PressableIcon
          icon="caretRight"
          style={themed($iconButton)}
          onPress={() => push(("/user/orders/" + id) as any)}
        />
      </Pressable>
      <Text text={status as any} style={themed($statusText)} />
      <View style={themed($wrapper)}>
        {orderItems.map((item) => (
          <OrderItem data={item} key={item.id} />
        ))}
      </View>
    </View>
  )
}

const $mainContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  padding: spacing.xs,
  backgroundColor: "#fff",
  borderRadius: spacing.md,
  paddingBottom: spacing.sm,
  height: "auto",
  gap: spacing.sm,
})

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  gap: spacing.sm,
  flexDirection: "row",
  position: "relative",
  alignItems: "center",
})

const $header: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
})

export const $statusText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors.errorBackground,
  width: "35%",
  fontSize: spacing.sm,
  paddingHorizontal: spacing.md,
  borderRadius: spacing.md,
  textAlign: "center",
})

const $iconButton: ThemedStyle<ImageStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  fontSize: spacing.sm,
  padding: spacing.sm,
  borderRadius: spacing.md,
})
