import { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext" // @demo remove-current-line
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useRouter } from "expo-router"
import { TextField } from "@/components/TextField"
import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import CategoryList from "@/components/category/ProductCategoryList"
import { productCategories } from "@/constants"

// @demo replace-next-line export const HomeScreen: FC = function HomeScreen(
export const HomeScreen: FC = function HomeScreen() {
  const { themed, theme } = useAppTheme()
  const { logout } = useAuth()
  const router = useRouter()

  function goNext() {
    router.push("/login")
  }

  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <TextField
          placeholderTx={"homeScreen:searchPlaceholder"}
          RightAccessory={() => (
            <Icon
              icon="search"
              style={{ marginVertical: "auto", top: 10, right: 5 }}
              color={theme.colors.text}
            />
          )}
        />
        <CategoryList categories={productCategories} />
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
  paddingTop: spacing.md,
})
