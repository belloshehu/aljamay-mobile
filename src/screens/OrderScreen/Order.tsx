import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import { OrderType } from "types/order.types"
import Loader from "@/components/Loader"
import { OrderItem } from "./OrderItem"
import Price from "@/components/product/Price"
import { formatDate } from "@/utils/timedate"

interface OrderProps extends OrderType {
  isLoading: boolean
}

export const Order: FC<OrderProps> = (props: OrderProps) => {
  const { themed } = useAppTheme()
  const { orderItems, totalAmount, isLoading, createdAt } = props
  if (isLoading) <Loader loadingText="order:loadingMany" />

  if (!orderItems || orderItems?.length === 0) return <Text tx="order:emptyOne" />
  return (
    <View style={themed($mainContainer)}>
      <View style={themed($header)}>
        <Text tx="order:orderHeading" txOptions={{ date: formatDate(createdAt?.toString()!) }} />
        <Price price={totalAmount} />
      </View>
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
