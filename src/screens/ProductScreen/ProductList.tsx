import React, { FC } from "react"
import { ActivityIndicator, FlatList, View, ViewStyle } from "react-native"
import { ProductType } from "types/product.types"
import Product from "./Product"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"

interface ProductListProps {
  products: ProductType[] | null
  isLoading: boolean
}

const ProductList: FC<ProductListProps> = (props: ProductListProps) => {
  const { themed } = useAppTheme()

  const { products, isLoading } = props
  if (isLoading) return <ActivityIndicator />
  if (!products) return <Card ContentComponent={<Text tx="productDetail:empty" />} />
  return (
    <FlatList
      renderItem={({ item: product }) => <Product product={product} key={product.id} />}
      data={products}
      numColumns={2}
      horizontal={false}
      ItemSeparatorComponent={() => <View style={themed($separator)} />}
      columnWrapperStyle={{ gap: 4 }}
      contentContainerStyle={themed($containerStyle)}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  )
}

const $list: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  flex: 1,
})

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 10,
  backgroundColor: colors.separator,
  borderRadius: spacing.sm,
  padding: spacing.sm,
  height: 80,
})

const $containerStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingBottom: 170,
})

const $separator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  height: 4,
})
export default ProductList
