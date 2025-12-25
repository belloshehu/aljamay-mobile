import { Icon } from "@/components/Icon"
import { translate } from "@/i18n/translate"
import { animationStyles } from "@/styles/animation.style"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { goBack } from "expo-router/build/global-state/routing"
import { FC, useTransition } from "react"
import { Pressable, ViewStyle, View, TextStyle, Image, ImageStyle } from "react-native"
import Animated from "react-native-reanimated"
import { ProductCategory } from "types/product.types"

interface CategoryDetailHeaderProps {
  category: ProductCategory
}
const CategoryDetailHeader: FC<CategoryDetailHeaderProps> = (props: CategoryDetailHeaderProps) => {
  const {
    category: { name, image },
  } = props
  const { themed } = useAppTheme()
  return (
    <View style={themed($header)}>
      <View style={themed($titleWrapper)}>
        <Pressable style={themed($backButton)} onPress={goBack}>
          <Icon icon="caretLeft" size={30} />
        </Pressable>
        <Animated.Text
          children={translate("categories:categoryDetailHeading", { name })}
          style={[themed($titleText), animationStyles.slideInAmination]}
        />
      </View>
      <Image source={image as any} style={themed($image)} />
    </View>
  )
}

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 0.5,
  width: "100%",
})

const $backButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.errorBackground,
  padding: spacing.xxs,
  borderRadius: spacing.lg,
})

const $titleWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: 20,
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingHorizontal: spacing.sm,
  position: "absolute",
  top: 40,
  zIndex: 10,
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.lg,
  fontWeight: "500",
  backgroundColor: colors.errorBackground,
  padding: spacing.xxs,
  paddingHorizontal: spacing.md,
  borderRadius: spacing.md,
})

const $image: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  borderBottomLeftRadius: spacing.xl,
  borderBottomRightRadius: spacing.xl,
  width: "100%",
  height: 350,
})

export default CategoryDetailHeader
