import { FC, useEffect, useState } from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useLocalSearchParams } from "expo-router"
import { dummyProducts, dummyPromo } from "@/constants"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { PromoItemType } from "types/promo.types"
import PromoDetailHeader from "./PromoDetailHeader"
import ProductList from "../ProductScreen/ProductList"
import { useGetProducts } from "@/hooks/service-hooks/product.service.hooks"

// @demo replace-next-line export const promoDetailScreen: FC = function promoDetailScreen(
export const PromoDetailScreen: FC = () => {
  const { themed } = useAppTheme()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [promo, setPromo] = useState<PromoItemType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDescription, setShowhowDescription] = useState(true)
  const { data: products, isLoading: loadingProduct } = useGetProducts({ search: id })

  useEffect(() => {
    setIsLoading(true)
    const filteredPromo = dummyPromo.find((promo) => promo.id === id)
    if (filteredPromo) {
      setPromo(filteredPromo)
    }
    setIsLoading(false)
  }, [id])

  if (isLoading) return <ActivityIndicator />
  if (!promo) return <Card ContentComponent={<Text tx="promo:notFound" />} />
  return (
    <View style={$styles.flex1}>
      <View style={themed($container)}>
        <PromoDetailHeader promo={promo} />
        <View style={themed($bottmoContainer)}>
          {showDescription && <Text>{promo.description}</Text>}
          <View>
            <ProductList
              products={products!}
              isLoading={loadingProduct}
              productListHeader={
                <Text
                  tx="promo:productList"
                  txOptions={{ count: dummyProducts.length }}
                  style={themed($titleText)}
                />
              }
              onProductScoll={() => {
                setShowhowDescription(false)
              }}
              onScrollEnd={() => {
                setShowhowDescription(true)
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const $titleText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 18,
  fontWeight: "500",
  color: colors.palette.primary500,
})

const $container: ThemedStyle<ViewStyle> = ({}) => ({
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flex: 1,
  gap: 0,
})

const $bottmoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 20,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
  marginTop: 0,
  flex: 1,
})
