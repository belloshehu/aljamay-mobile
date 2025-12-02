import Price from "@/components/product/Price"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { useRouter } from "expo-router"
import { FC } from "react"
import { ImageStyle, Pressable, Text, TextStyle, View, ViewStyle } from "react-native"
import Animated from "react-native-reanimated"
import { ProductType } from "types/product.types"

interface ProductProps {
  product: ProductType
  deleteHandler?: (id: string) => void
}
const Product: FC<ProductProps> = (props: ProductProps) => {
  const { themed } = useAppTheme()
  const router = useRouter()
  const {
    product: { image, name, price, discount, id },
  } = props

  const goToDetailScreen = () => {
    router.push(("/(app)/(tabs)/(products)/product/" + id) as any)
  }
  return (
    <Pressable style={themed($container)} onPress={goToDetailScreen}>
      <Animated.Image source={image as any} alt={name} style={themed($image)} />
      <View style={themed($footer)}>
        <Text style={themed($name)}>{name}</Text>
        <Price price={price} discount={discount} />
      </View>
    </Pressable>
  )
}
const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 2,
  borderWidth: 0,
  borderColor: colors.separator,
  borderRadius: spacing.xxs,
  width: "48%",
})

const $image: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  borderTopLeftRadius: spacing.md,
  borderTopRightRadius: spacing.md,
  width: "100%",
  height: 150,
})

const $footer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  padding: spacing.sm,
})

const $name: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  color: colors.text,
  fontSize: spacing.sm,
  fontFamily: typography.code?.normal,
})

export default Product
