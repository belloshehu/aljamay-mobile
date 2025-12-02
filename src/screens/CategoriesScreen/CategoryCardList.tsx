import React, { FC } from "react"
import { ActivityIndicator, FlatList, Text, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import CategoryCard from "./CategoryCard"
import { ProductCategory } from "types/product.types"

interface CategoryCardListProps {
  categories: ProductCategory[] | null
  isLoading: boolean
}

const CategoryCardList: FC<CategoryCardListProps> = (props: CategoryCardListProps) => {
  const { themed } = useAppTheme()

  const handlePress = (name: string) => {}

  const { categories, isLoading } = props
  if (isLoading) return <ActivityIndicator />
  if (!categories)
    return (
      <View style={themed($container)}>
        <Text>No categorys yet</Text>
      </View>
    )
  return (
    <FlatList
      renderItem={({ item: category }) => (
        <CategoryCard {...category} key={category.name} pressHandler={handlePress} />
      )}
      data={categories}
      numColumns={2}
      horizontal={false}
      ItemSeparatorComponent={() => <View style={themed($separator)} />}
      columnWrapperStyle={{ gap: 4 }}
      contentContainerStyle={themed($containerStyle)}
      keyExtractor={(item) => item.name}
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
export default CategoryCardList
