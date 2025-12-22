import { FC } from "react"
import {
  Image,
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
import { css, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import Animated from "react-native-reanimated"
import { GlowWrapper } from "../GlowWrapper"

interface ProductCategoryItemProps {
  image: ImageSourcePropType
  name: string
  isSelected?: boolean
  pressHandler: (name: string) => void
  count?: number
}
const ProductCategoryItem: FC<ProductCategoryItemProps> = (props: ProductCategoryItemProps) => {
  const { themed } = useAppTheme()
  const translateX = useSharedValue(40)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }))
  const { name, image, isSelected, pressHandler, count } = props

  const handlePress = () => {
    translateX.value = +50
    pressHandler(name)
  }

  if (isSelected)
    return (
      <GlowWrapper>
        <Pressable style={[themed($wrapper)]} onPress={handlePress}>
          <Animated.Image source={image} style={themed([$image])} />
          <Text style={themed([$text, isSelected && { fontWeight: "bold" }])}>{name}</Text>
          {isSelected && (
            <View style={themed($badge)}>
              <Text style={themed($badgeText)}>{count || 0}</Text>
            </View>
          )}
        </Pressable>
      </GlowWrapper>
    )
  return (
    <Pressable style={[themed($wrapper)]} onPress={handlePress}>
      <Animated.Image source={image} style={themed([$image])} />
      <Text style={themed([$text, isSelected && { fontWeight: "bold" }])}>{name}</Text>
      {isSelected && (
        <View style={themed($badge)}>
          <Text style={themed($badgeText)}>{count || 0}</Text>
        </View>
      )}
    </Pressable>
  )
}

const $wrapper: ThemedStyle<ViewStyle> = ({ colors }) => {
  return {
    alignItems: "center",
    justifyContent: "center",
  }
}

const $image: ThemedStyle<ImageStyle> = ({}) => ({
  width: 50,
  height: 40,
  borderRadius: 30,
  borderWidth: 0,
})

const $badge: ThemedStyle<ImageStyle> = ({ colors }) => ({
  width: 40,
  height: 20,
  borderRadius: 10,
  backgroundColor: colors.separator,
  position: "absolute",
  right: -15,
  top: -10,
  justifyContent: "center",
})

const $badgeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  fontSize: 11,
  textAlign: "center",
})

const $text: ThemedStyle<TextStyle> = ({ colors, typography, spacing }) => ({
  color: colors.text,
  fontSize: 10,
  fontFamily: typography.code?.normal,
  backgroundColor: colors.palette.neutral200,
  paddingHorizontal: spacing.xs,
  borderRadius: spacing.md,
})

const pulse = css.keyframes({
  "0%": {
    transform: "scale(0.1)",
  },
  "25%": {
    transform: "scale(0.25)",
  },
  "50%": {
    transform: "scale(0.5)",
  },
  "75%": {
    transform: "scale(0.75)",
  },
  "100%": {
    transform: "scale(1)",
  },
})

export default ProductCategoryItem
