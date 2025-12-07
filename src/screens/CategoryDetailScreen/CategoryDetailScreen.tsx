import { FC, useEffect, useState } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useLocalSearchParams } from "expo-router"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { ProductCategory, ProductType } from "types/product.types"
import CategoryDetailHeader from "./CategoryDetailHeader"
import { dummyProducts, productCategories } from "@/constants"
import ProductList from "../ProductScreen/ProductList"

// @demo replace-next-line export const CategoryDetailScreen: FC = function CategoryDetailScreen(
export const CategoryDetailScreen: FC = function CategoryDetailScreen() {
  const { themed } = useAppTheme()
  const { name } = useLocalSearchParams<{ name: string }>()
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductType[] | null>(dummyProducts)

  useEffect(() => {
    setIsLoading(true)
    const filteredCategory = productCategories.find((category) => category.name === name)
    if (filteredCategory) {
      setCategory(filteredCategory)
    }
    setIsLoading(false)
    filterProductsByCategory(name)
  }, [name])

  const filterProductsByCategory = (categoryName: string) => {
    if (categoryName.toLocaleLowerCase() === "all") {
      setProducts(dummyProducts)
    }

    const filtered = products?.filter(function (product) {
      return categoryName.toLocaleLowerCase().includes(product.name.toLocaleLowerCase())
    })

    if (filtered && filtered.length > 0) {
      setProducts(filtered)
    }
  }

  if (isLoading) return <ActivityIndicator />
  if (!category) return <Card ContentComponent={<Text tx="categories:notFound" />} />
  return (
    <View style={$styles.flex1}>
      <View style={themed($container)}>
        <CategoryDetailHeader category={category} />
        <View style={themed($bottmoContainer)}>
          <Text tx="categories:itemsInCategory" txOptions={{ name }} />
          <ProductList products={products} isLoading={isLoading} />
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
