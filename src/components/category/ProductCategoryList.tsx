import { FC, useState } from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import { ProductCategory } from "types/product.types"
import CategoryItem from "./ProductCategoryItem"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import ProductList from "../../screens/ProductScreen/ProductList"
import { useGetProducts } from "@/hooks/service-hooks/product.service.hooks"

interface ProductCategoryListProps {
  categories: ProductCategory[]
}
const ProductCategoryList: FC<ProductCategoryListProps> = (props: ProductCategoryListProps) => {
  const { themed } = useAppTheme()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { categories } = props
  const { isLoading, data: products, refetch } = useGetProducts({ search: selectedCategory })

  const handleItemClick = (name: string) => {
    if (name) {
      setSelectedCategory(name)
    }
  }

  return (
    <View style={themed($container)}>
      <ScrollView
        contentContainerStyle={themed($scroll)}
        horizontal={true}
        bounces
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.name}
            {...category}
            pressHandler={handleItemClick}
            isSelected={selectedCategory === category.name}
            count={products?.length}
          />
        ))}
      </ScrollView>
      <ProductList products={products!} isLoading={isLoading} reLoad={refetch} />
    </View>
  )
}

const $scroll: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 10,
  flexDirection: "row",
  marginVertical: 10,
  backgroundColor: colors.errorBackground,
  padding: spacing.sm,
  borderRadius: spacing.md,
  overflowX: "auto",
})

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 10,
})

export default ProductCategoryList
