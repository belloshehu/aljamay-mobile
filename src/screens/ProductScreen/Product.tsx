import { Button } from "@/components/Button"
import { Icon, PressableIcon } from "@/components/Icon"
import Price from "@/components/product/Price"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { useRouter } from "expo-router"
import { FC } from "react"
import { ImageStyle, Pressable, Text, TextStyle, View, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { ProductType } from "types/product.types"

interface ProductProps {
  product: ProductType
  deleteHandler?: (id: string) => void
}
const Product: FC<ProductProps> = (props: ProductProps) => {
  const { themed } = useAppTheme()
  const scale = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] }
  })

  const router = useRouter()
  const {
    product: { image, name, price, discount, id },
  } = props

  const goToDetailScreen = () => {
    scale.value = withSpring(1.6, {
      damping: 10,
      stiffness: 200,
    })

    router.push(("/(app)/(tabs)/(products)/product/" + id) as any)
  }

  const addToCart = () => {
    // implement adding product to shopping cart
  }

  return (
    <Pressable
      style={[themed($container), { transform: animatedStyle.transform }]}
      onPress={goToDetailScreen}
    >
      <Animated.Image source={image as any} alt={name} style={themed($image)} />
      <View style={themed($footer)}>
        <Text style={themed($name)}>{name}</Text>
        <View style={themed($priceWrapper)}>
          <Price
            price={price}
            discount={discount}
            // containerStyle={{ gap: 2 }}
            // discountWrapperStyle={{ paddingHorizontal: 5 }}
          />
        </View>
        <Button
          LeftAccessory={() => <Icon icon="cart" size={20} />}
          onPress={addToCart}
          style={themed($cartButton)}
          textStyle={themed($cartButtonText)}
          tx="productDetail:cart"
        />
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

const $priceWrapper: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  gap: 10,
})

const $cartButton: ThemedStyle<ImageStyle> = ({ spacing, colors }) => ({
  padding: 0,
  marginTop: spacing.sm,
  gap: spacing.xs,
  backgroundColor: colors.errorBackground,
})

const $cartButtonText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.sm,
  color: "#fff",
})

export default Product
