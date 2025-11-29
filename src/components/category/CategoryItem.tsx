import { FC, JSX } from "react"
import { Button } from "../Button"
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"

interface CategoryItemProps {
  image: ImageSourcePropType
  name: string
  isSelected?: boolean
  pressHandler: (name: string) => void
}
const CategoryItem: FC<CategoryItemProps> = (props: CategoryItemProps) => {
  const { themed } = useAppTheme()
  const { name, image, isSelected, pressHandler } = props

  const handlePress = () => {
    pressHandler(name)
  }

  return (
    <Pressable style={themed($wrapper)} onPress={handlePress}>
      <Image
        source={image}
        style={themed([$image, isSelected && { borderWidth: 1, height: 50 }])}
      />
      <Text style={themed([$text, isSelected && { fontWeight: "bold" }])}>{name}</Text>
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

const $text: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  fontSize: 12,
})

export default CategoryItem
