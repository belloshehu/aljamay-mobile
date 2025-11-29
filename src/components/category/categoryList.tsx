import { FC, useState } from "react"
import { ScrollView, ViewStyle } from "react-native"
import { ProductCategory } from "types/product.types"
import CategoryItem from "./CategoryItem"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"

interface CategoryListProps {
  categories: ProductCategory[]
}
const CategoryList: FC<CategoryListProps> = (props: CategoryListProps) => {
  const { themed } = useAppTheme()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { categories } = props

  const handleItemClick = (name: string) => {
    if (name) {
      setSelectedCategory(name)
    }
  }
  return (
    <ScrollView contentContainerStyle={themed($scroll)}>
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          {...category}
          pressHandler={handleItemClick}
          isSelected={selectedCategory === category.name}
        />
      ))}
    </ScrollView>
  )
}

const $scroll: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 10,
  flexDirection: "row",
  width: "100%",
  marginVertical: 10,
  backgroundColor: colors.separator,
  padding: spacing.sm,
  borderRadius: spacing.md,
})

export default CategoryList
