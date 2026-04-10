import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import CategoryCardList from "./CategoryCardList"
import { productCategories } from "@/constants"
import { Text } from "@/components/Text"

// @demo replace-next-line export const CategoriesScreen: FC = function CategoriesScreen(
const CategoriesScreen: FC = function CategoriesScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Text>
          Explore our wide range of product categories and find exactly what you're looking for.
        </Text>
        <CategoryCardList categories={productCategories} isLoading={false} />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.lg,
  gap: spacing.lg,
})

export default CategoriesScreen
