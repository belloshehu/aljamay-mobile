import { FC, useEffect, useState } from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ProductType } from "types/product.types"
import { dummyProducts } from "@/constants"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import Price from "@/components/product/Price"

// @demo replace-next-line export const CheckoutScreen: FC = function CheckoutScreen(
export const CheckoutScreen: FC = function CheckoutScreen() {
  const { themed } = useAppTheme()
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const filteredProduct = dummyProducts.find((product) => product.id === id)
    if (filteredProduct) {
      setProduct(filteredProduct)
    }
    setIsLoading(false)
  }, [id])

  if (isLoading) return <ActivityIndicator />
  if (!product) return <Card ContentComponent={<Text tx="checkout:notFound" />} />
  return (
    <Screen preset="auto" contentContainerStyle={$styles.flex1}>
      <View style={themed($container)}>
        <View style={themed($bottmoContainer)}>
          <View style={themed($buttonWrapper)}>
            <Price
              price={product.price}
              discount={product.discount}
              priceStyle={themed($price)}
              discountStyle={themed($discount)}
            />
            <Button
              tx="checkout:cart"
              LeftAccessory={() => <Icon icon="cart" />}
              style={themed($cartButton)}
              preset="default"
            />
          </View>
          <View style={themed($buttonWrapper)}>
            <Button
              textStyle={themed($orderButtonText)}
              tx="checkout:checkout"
              preset="reversed"
              style={themed($orderButton)}
            />
          </View>
          <Text>{product.description}</Text>
        </View>
      </View>
    </Screen>
  )
}

const $price: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  color: colors.text,
  fontSize: spacing.md,
  fontFamily: typography.code?.normal,
  fontWeight: "bold",
})

const $discount: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  fontSize: spacing.md,
})

const $orderButton: ThemedStyle<ViewStyle> = ({ spacing, colors, typography }) => ({
  borderRadius: spacing.xl,
  // backgroundColor: colors.separator,
  paddingHorizontal: spacing.xxl,
  width: "100%",
})

const $orderButtonText: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  color: colors.background,
})

const $cartButton: ThemedStyle<ViewStyle> = ({ spacing, colors, typography }) => ({
  borderRadius: spacing.xl,
  paddingHorizontal: spacing.xl,
})

const $buttonWrapper: ThemedStyle<ViewStyle> = ({ spacing, colors, typography }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flex: 1,
  gap: 20,
})

const $bottmoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 20,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
  marginTop: spacing.xl,
  flex: 0.55,
})
