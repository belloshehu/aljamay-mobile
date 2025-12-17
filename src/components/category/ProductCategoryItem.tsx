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
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

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

  return (
    <Pressable style={[themed($wrapper)]} onPress={handlePress}>
      <Image
        source={image}
        style={themed([$image, isSelected && { borderWidth: 1, height: 50 }])}
      />
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

export default ProductCategoryItem
