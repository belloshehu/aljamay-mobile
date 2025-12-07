import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { getDiscountPercent } from "@/utils/product"
import { FC } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "@/components/Text"

interface PriceProps {
  price: number
  discount?: number
  containerStyle?: StyleProp<ViewStyle>
  priceStyle?: StyleProp<TextStyle>
  discountStyle?: StyleProp<TextStyle>
  discountWrapperStyle?: StyleProp<ViewStyle>
}
const Price: FC<PriceProps> = (props: PriceProps) => {
  const { containerStyle, discountStyle, discountWrapperStyle, priceStyle, price, discount } = props
  const { themed } = useAppTheme()
  return (
    <View style={[themed($priceContainer), containerStyle]}>
      <View style={themed($priceWrapper)}>
        <Text style={[themed($naira), priceStyle]}>N</Text>
        <Text style={[themed($price), priceStyle]}>{price}</Text>
      </View>

      {discount && discount > 0 && (
        <View style={[themed($discountWrapper), discountWrapperStyle]}>
          <Text style={[themed($naira), priceStyle]}>N</Text>
          <Text style={[themed($discount), discountStyle]}>{price + discount}</Text>
        </View>
      )}
    </View>
  )
}

const $priceContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  width: "auto",
  gap: 10,
  flexDirection: "row",
  borderRadius: spacing.xxl,
})

const $discountWrapper: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  width: "auto",
  flexDirection: "row",
  backgroundColor: colors.errorBackground,
  paddingHorizontal: spacing.sm,
  borderRadius: spacing.xs,
})

const $priceWrapper: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  alignItems: "center",
  flexDirection: "row",
})
const $price: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  color: colors.text,
  fontSize: spacing.sm,
  fontFamily: typography.code?.normal,
})

const $discount: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  color: colors.text,
  fontSize: spacing.sm,
  fontFamily: typography.code?.normal,
  textDecorationLine: "line-through",
})

const $naira: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  color: colors.text,
  fontSize: spacing.sm,
  fontFamily: typography.code?.normal,
  textDecorationLine: "line-through",
})

export default Price
