import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import Price from "@/components/product/Price"
import { OrderItemType } from "types/order.types"
import { Card } from "@/components/Card"
import { push } from "expo-router/build/global-state/routing"

interface OrderItemProps {
  data: OrderItemType
}

export const OrderItem: FC<OrderItemProps> = (props: OrderItemProps) => {
  const { themed } = useAppTheme()
  const {
    data: {
      price,
      product: { image, name, id, status },
      quantity,
    },
  } = props

  console.log(id)
  const goToDetailScreen = () => {
    push(("/product/" + id) as any)
  }
  return (
    <View style={themed($mainContainer)}>
      <Card
        onPress={goToDetailScreen}
        ContentComponent={
          <View style={themed($wrapper)}>
            <Image src={image as any} alt={name} style={themed($image)} />
            <View>
              <Text text={name} style={themed($name)} />
              <Price price={price * quantity} />
            </View>
          </View>
        }
      ></Card>
    </View>
  )
}

const $mainContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: spacing.md,
})

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  gap: spacing.sm,
  flexDirection: "row",
  position: "relative",
  alignItems: "center",
})

const $image: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  borderTopLeftRadius: spacing.md,
  borderTopRightRadius: spacing.md,
  width: 150,
  height: 100,
  resizeMode: "contain",
})

const $name: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.md,
  fontWeight: "600",
  color: colors.errorBackground,
})
