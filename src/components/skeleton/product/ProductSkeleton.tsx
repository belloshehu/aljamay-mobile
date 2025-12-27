import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import React from "react"
import { View, ViewStyle } from "react-native"
import SkeletonText from "../SkeletonText"
import SkeletonButton from "../SkeletonButton"

const ProductImage = () => <SkeletonText height={150} />
const ProductName = () => <SkeletonText height={15} />
const ProductPrice = () => <SkeletonText height={15} />

export const ProductSkeleton = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <ProductImage />
      <ProductName />
      <ProductPrice />
      <SkeletonButton />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 2,
  borderWidth: 0,
  borderColor: colors.separator,
  borderRadius: spacing.xxs,
  width: "48%",
})
