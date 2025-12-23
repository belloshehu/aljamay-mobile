import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import CategoryList from "@/components/category/ProductCategoryList"
import { productCategories } from "@/constants"
import ProductSearchModal from "@/screens/ProductScreen/ProductSearchModal"
import { Marquee } from "@animatereactnative/marquee"
import { Text } from "@/components/Text"
import { Icon } from "@/components/Icon"

export const HomeScreen: FC = function HomeScreen() {
  const { themed, theme } = useAppTheme()

  return (
    <Screen preset="fixed" contentContainerStyle={[$styles.flex1]}>
      <View style={themed($topContainer)}>
        <Marquee spacing={2} speed={1}>
          <View style={themed($marquee)}>
            <Text>Happy new year and Merry christmas in advance. </Text>
            <Icon icon="bell" />
          </View>
        </Marquee>
        <ProductSearchModal />
        <CategoryList categories={productCategories} />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  paddingHorizontal: spacing.xxs,
  flex: 1,
})

const $marquee: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.errorBackground,
  marginBottom: spacing.xs,
  flexDirection: "row",
  justifyContent: "center",
  padding: spacing.xxxs,
  paddingHorizontal: spacing.sm,
  borderRadius: spacing.sm,
})
