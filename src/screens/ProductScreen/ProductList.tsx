import React, { FC, JSX } from "react"
import { ActivityIndicator, FlatList, View, ViewStyle } from "react-native"
import { ProductType } from "types/product.types"
import Product from "./Product"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { ProductListEmptyState } from "@/components/product/ProductEmptyState"

interface ProductListProps {
  products: ProductType[] | null
  isLoading: boolean
  productListHeader?: JSX.Element
  onProductScoll?: () => void
  onScrollEnd?: () => void
  minimum?: boolean
  reLoad?: () => void
}

const ProductList: FC<ProductListProps> = (props: ProductListProps) => {
  const { themed } = useAppTheme()

  const { products, isLoading, minimum, reLoad } = props
  if (isLoading) return <ActivityIndicator />
  if (!products || products.length === 0) return <ProductListEmptyState buttonOnPress={reLoad} />

  return (
    <FlatList
      ListHeaderComponent={props.productListHeader || null}
      renderItem={({ item: product }) => (
        <Product minimum={minimum} product={product} key={product.id} />
      )}
      data={products}
      numColumns={2}
      horizontal={false}
      ItemSeparatorComponent={() => <View style={themed($separator)} />}
      columnWrapperStyle={{ gap: 4 }}
      contentContainerStyle={themed($containerStyle)}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      onScrollBeginDrag={props.onProductScoll}
      onStartReached={props.onScrollEnd}
    />
  )
}

const $containerStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingBottom: 170,
})

export const $separator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  height: 4,
})
export default ProductList
