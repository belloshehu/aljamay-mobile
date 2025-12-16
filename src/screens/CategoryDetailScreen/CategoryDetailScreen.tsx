import { FC, useEffect, useState } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useLocalSearchParams } from "expo-router"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { ProductCategory } from "types/product.types"
import CategoryDetailHeader from "./CategoryDetailHeader"
import { productCategories } from "@/constants"
import ProductList from "../ProductScreen/ProductList"
import { useGetProducts } from "@/hooks/service-hooks/product.service.hooks"

// @demo replace-next-line export const CategoryDetailScreen: FC = function CategoryDetailScreen(
export const CategoryDetailScreen: FC = function CategoryDetailScreen() {
  const { themed } = useAppTheme()
  const { name } = useLocalSearchParams<{ name: string }>()
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { data: products, isLoading: loadingProducts, refetch } = useGetProducts({ search: name })

  useEffect(() => {
    setIsLoading(true)
    const filteredCategory = productCategories.find(
      (category) => category?.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    )
    if (filteredCategory) {
      setCategory(filteredCategory)
    }
    setIsLoading(false)
  }, [name])

  if (isLoading) return <ActivityIndicator />
  if (!category)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View
          style={themed([
            $container,
            { justifyContent: "center", alignItems: "center", gap: 5, padding: 20 },
          ])}
        >
          <Card ContentComponent={<Text tx="categories:notFound" />} />
        </View>
      </Screen>
    )
  return (
    <View style={$styles.flex1}>
      <View style={themed($container)}>
        <CategoryDetailHeader category={category} />
        <View style={themed($bottmoContainer)}>
          <Text tx="categories:itemsInCategory" txOptions={{ name }} />
          <ProductList products={products!} isLoading={loadingProducts} reLoad={refetch} />
        </View>
      </View>
    </View>
  )
}

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
  flex: 0.68,
})
