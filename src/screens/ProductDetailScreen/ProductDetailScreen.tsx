import { FC, useEffect, useState } from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useLocalSearchParams } from "expo-router"

import ProductDetailHeader from "../ProductScreen/ProductDetailHeader"
import { ProductType } from "types/product.types"
import { dummyProducts } from "@/constants"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import Price from "@/components/product/Price"
import { useBottomSheetContext } from "@/context/BottomSheetContext"
import AddProductToCart from "@/components/shoppingCart/AddProductToCart"
import { Screen } from "@/components/Screen"
import { push } from "expo-router/build/global-state/routing"

// @demo replace-next-line export const ProductDetailScreen: FC = function ProductDetailScreen(
export const ProductDetailScreen: FC = function ProductDetailScreen() {
  const { themed } = useAppTheme()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { handleModalDismiss, setBottomChildren, handleModalPreset } = useBottomSheetContext()

  useEffect(() => {
    setIsLoading(true)
    const filteredProduct = dummyProducts.find((product) => product.id === id)
    if (filteredProduct) {
      setProduct(filteredProduct)
    }
    setIsLoading(false)
  }, [id])

  // Press handle that triggers a bottomsheet to add product
  const showAddToCartBottomSheet = () => {
    setBottomChildren(
      <AddProductToCart handleBottomSheetClose={handleModalDismiss} product={product!} />,
    )
    handleModalPreset()
  }
  const goToList = () => {
    push("/")
  }
  if (isLoading) return <ActivityIndicator />
  if (!product)
    return (
      <Screen style={[$styles.container, { gap: 15 }]}>
        <View style={themed($container)}>
          <Card
            ContentComponent={<Text tx="productDetail:notFound" style={{ textAlign: "center" }} />}
          />
          <Button
            tx="productDetail:goToList"
            preset="filled"
            style={{ width: "100%" }}
            onPress={goToList}
          />
        </View>
      </Screen>
    )
  return (
    <View style={$styles.flex1}>
      <View style={themed($container)}>
        <ProductDetailHeader product={product} />
        <View style={themed($bottmoContainer)}>
          <View style={themed($buttonWrapper)}>
            <Price
              price={product.price}
              discount={product.discount}
              priceStyle={themed($price)}
              discountStyle={themed($discount)}
            />
            <Button
              tx="productDetail:cart"
              LeftAccessory={() => <Icon icon="cart" />}
              style={themed($cartButton)}
              preset="default"
              onPress={showAddToCartBottomSheet}
            />
          </View>
          <View style={themed($buttonWrapper)}>
            <Button
              textStyle={themed($orderButtonText)}
              tx="productDetail:checkout"
              preset="reversed"
              style={themed($orderButton)}
            />
          </View>
          <Text>{product.description}</Text>
        </View>
      </View>
    </View>
  )
}

const $price: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  color: colors.text,
  fontSize: spacing.md,
  fontFamily: typography.code?.normal,
  fontWeight: "bold",
})

const $discount: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.md,
})

const $orderButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  borderRadius: spacing.xl,
  backgroundColor: colors.errorBackground,
  paddingHorizontal: spacing.xxl,
  width: "100%",
})

const $orderButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.background,
})

const $cartButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: spacing.xl,
  paddingHorizontal: spacing.xl,
})

const $buttonWrapper: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
})

const $container: ThemedStyle<ViewStyle> = ({}) => ({
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
  flex: 0.68,
})
