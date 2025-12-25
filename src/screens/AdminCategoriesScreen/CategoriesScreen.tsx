import { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { productCategories } from "@/constants"
import CategoryCardList from "../CategoriesScreen/CategoryCardList"

// @demo replace-next-line export const CategoriesScreen: FC = function CategoriesScreen(
const AdminCategoriesScreen: FC = function CategoriesScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        {/* <Text
          style={themed($CategoriesHeading)}
          tx="categories:numberOfCategories"
          txOptions={{ count: productCategories.length }}
        />
        <Text tx="categories:listDescription" /> */}
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
})

export default AdminCategoriesScreen
