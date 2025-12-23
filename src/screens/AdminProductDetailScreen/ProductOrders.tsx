import { Card } from "@/components/Card"
import { OrderListEmptyState } from "@/components/CustomEmptyState"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { View, ViewStyle } from "react-native"
import { OrderItemType } from "types/order.types"
import { formatDate } from "@/utils/formatDate"
import Price from "@/components/product/Price"

interface ProductOrdersProps {
  orders: OrderItemType[] | null
}
export default function ProductOrders({ orders }: ProductOrdersProps) {
  const { themed } = useAppTheme()
  if (!orders || orders.length === 0) return <OrderListEmptyState />
  return (
    <View style={themed($container)}>
      <Text tx="productDetail:orders" txOptions={{ count: orders.length }} />
      <View>
        {orders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </View>
    </View>
  )
}

function OrderCard({ order }: { order: OrderItemType }) {
  const { theme } = useAppTheme()
  return (
    <Card
      key={order.id}
      style={{ marginBottom: 10 }}
      ContentComponent={
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{order.orderNumber}</Text>
            <Text>({formatDate(order.createdAt as any)})</Text>
          </View>
          <Text>{order.quantity} item(s) ordered</Text>
          <Price
            price={order.price * order.quantity}
            containerStyle={{
              backgroundColor: theme.colors.errorBackground,
              width: "50%",
              paddingHorizontal: 10,
              marginTop: 10,
            }}
          />
        </>
      }
    />
  )
}
const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  width: "100%",
  padding: spacing.xxs,
  gap: spacing.sm,
})
