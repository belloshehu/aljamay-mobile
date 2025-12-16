import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useRouter } from "expo-router"
import CategoryList from "@/components/category/ProductCategoryList"
import { productCategories } from "@/constants"
import ProductSearchModal from "@/screens/ProductScreen/ProductSearchModal"

export const HomeScreen: FC = function HomeScreen() {
  const { themed } = useAppTheme()
  const router = useRouter()

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <ProductSearchModal />
        <CategoryList categories={productCategories} />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  flex: 1,
})

const $searchInput: ThemedStyle<TextStyle> = ({ spacing }) => ({
  borderRadius: spacing.md,
})
