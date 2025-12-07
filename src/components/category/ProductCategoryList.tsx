import { FC, useState } from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import { ProductCategory, ProductType } from "types/product.types"
import CategoryItem from "./ProductCategoryItem"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import ProductList from "../../screens/ProductScreen/ProductList"
import { dummyProducts } from "@/constants"

interface ProductCategoryListProps {
  categories: ProductCategory[]
}
const ProductCategoryList: FC<ProductCategoryListProps> = (props: ProductCategoryListProps) => {
  const { themed } = useAppTheme()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [products, setProducts] = useState<ProductType[] | null>(dummyProducts)
  const { categories } = props

  const handleItemClick = (name: string) => {
    if (name) {
      setSelectedCategory(name)
      filterProductsByCategory(name)
    }
  }

  const filterProductsByCategory = (categoryName: string) => {
    if (categoryName.toLocaleLowerCase() === "all") {
      setProducts(dummyProducts)
    }
    const filtered = products?.filter((product) =>
      product.name.includes(categoryName.toLocaleLowerCase()),
    )
    if (filtered && filtered.length > 0) {
      setProducts(filtered)
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
      <ProductList products={products} isLoading={false} />
    </View>
  )
}

const $scroll: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 10,
  flexDirection: "row",
  // width: "100%",
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
