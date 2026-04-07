import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import React from "react"
import { View, ViewStyle } from "react-native"
import SkeletonText from "../SkeletonText"
import SkeletonButton from "../SkeletonButton"

const ProductImage = () => <SkeletonText height={120} />
const ProductName = () => <SkeletonText height={20} width={130} />
const ProductPrice = () => <SkeletonText height={20} width={80} />

export const ProductSkeleton = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <ProductImage />
      <ProductName />
      <View style={themed($textWrapper)}>
        <ProductPrice />
        <ProductPrice />
      </View>
      <SkeletonButton />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 5,
  borderWidth: 0,
  borderColor: colors.separator,
  borderRadius: spacing.xxs,
  width: "48%",
})

const $textWrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  gap: 10,
  justifyContent: "space-between",
  alignItems: "center",
})
