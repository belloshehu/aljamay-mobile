import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext" // @demo remove-current-line
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useRouter } from "expo-router"
import CategoryList from "@/components/category/ProductCategoryList"
import { productCategories } from "@/constants"
import ProductSearchModal from "@/screens/ProductScreen/ProductSearchModal"

// @demo replace-next-line export const HomeScreen: FC = function HomeScreen(
export const HomeScreen: FC = function HomeScreen() {
  const { themed, theme } = useAppTheme()
  const { logout } = useAuth()
  const router = useRouter()

  function goNext() {
    router.push("/user/login")
  }

  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

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
