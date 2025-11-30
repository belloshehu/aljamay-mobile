import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { Image, ImageStyle, Text, View, ViewStyle } from "react-native"
import { ProductType } from "types/product.types"

interface ProductProps {
  product: ProductType
  deleteHandler?: (id: string) => void
}
const Product: FC<ProductProps> = (props: ProductProps) => {
  const { themed } = useAppTheme()
  const {
    product: { image, name, price, discount },
  } = props
  return (
    <View style={themed($container)}>
      <Image source={image as any} alt={name} style={themed($image)} />
      <View style={themed($footer)}>
        <Text>{name}</Text>
        <Text>{price}</Text>
      </View>
    </View>
  )
}
const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 2,
  borderWidth: 1,
  borderColor: colors.separator,
  borderRadius: spacing.sm,
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

export default Product
