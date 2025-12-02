import { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useRouter } from "expo-router"
import { Text } from "@/components/Text"
import CategoryCardList from "./CategoryCardList"
import { productCategories } from "@/constants"

// @demo replace-next-line export const CategoriesScreen: FC = function CategoriesScreen(
export const CategoriesScreen: FC = function CategoriesScreen() {
  const { themed, theme } = useAppTheme()
  const router = useRouter()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Text style={themed($CategoriesHeading)}>{productCategories.length} Items</Text>
        <Text>List of Categoriestions we have for you</Text>
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

const $CategoriesFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $CategoriesHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  fontWeight: "bold",
})
