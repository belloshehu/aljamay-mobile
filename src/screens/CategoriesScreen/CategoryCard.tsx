import { FC } from "react"
import {
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import Animated from "react-native-reanimated"
import { push } from "expo-router/build/global-state/routing"
import { animationStyles } from "@/styles/animation.style"

interface CategoryCardProps {
  image: ImageSourcePropType
  name: string
  isSelected?: boolean
  pressHandler: (name: string) => void
  count?: number
}
const CategoryCard: FC<CategoryCardProps> = (props: CategoryCardProps) => {
  const { themed } = useAppTheme()
  const { name, image, isSelected, pressHandler, count } = props

  const handlePress = () => {
    pressHandler(name)
    push(("/categories/" + name) as any)
  }

  return (
    <Pressable style={themed($wrapper)} onPress={handlePress}>
      <ImageBackground
        source={image}
        style={themed([$image, isSelected && { borderWidth: 1, height: 50 }])}
      />
      <Animated.Text style={themed([$text, animationStyles.slideInXAmination])}>
        {name}
      </Animated.Text>

      <View style={themed($badge)}>
        <Text style={themed($badgeText)}>{count || 0}</Text>
      </View>
    </Pressable>
  )
}

const $wrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => {
  return {
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    borderRadius: spacing.md,
    height: 250,
    backgroundColor: colors.separator,
    position: "relative",
  }
}

const $image: ThemedStyle<ImageStyle> = ({ spacing, colors }) => ({
  width: "100%",
  flex: 1,
  borderRadius: spacing.md,
  backgroundColor: colors.separator,
  overlayColor: colors.errorBackground,
})

const $badge: ThemedStyle<ImageStyle> = ({ colors }) => ({
  width: 40,
  height: 20,
  borderRadius: 20,
  backgroundColor: colors.errorBackground,
  position: "absolute",
  justifyContent: "center",
  left: 10,
  bottom: 10,
})

const $badgeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  fontSize: 11,
  textAlign: "center",
})

const $text: ThemedStyle<TextStyle> = ({ colors, typography, spacing }) => ({
  color: "#fff",
  fontSize: 14,
  fontWeight: "bold",
  fontFamily: typography.code?.normal,
  position: "absolute",
  left: 10,
  top: 10,
  backgroundColor: colors.errorBackground,
  paddingHorizontal: spacing.md,
  borderRadius: spacing.sm,
})

export default CategoryCard
