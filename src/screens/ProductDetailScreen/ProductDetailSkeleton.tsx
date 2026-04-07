import SkeletonButton from "@/components/skeleton/SkeletonButton"
import SkeletonText from "@/components/skeleton/SkeletonText"
import { View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import React from "react"

const ProductImage = () => <SkeletonText height={250} />
const ProductName = () => <SkeletonText height={20} width={"70%"} />
const ProductPrice = () => <SkeletonText height={25} width={"47%"} />

export const ProductDetailSkeleton = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <ProductImage />
      <View style={themed($textWrapper)}>
        <View style={{ gap: 5, flexDirection: "row" }}>
          <ProductName />
          <ProductPrice />
        </View>
        <SkeletonButton width={40} />
      </View>
      <SkeletonButton width={"30%"} />
      <SkeletonButton />
      <SkeletonText height={200} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 5,
  borderWidth: 0,
  borderColor: colors.separator,
  borderRadius: spacing.xxs,
  width: "100%",
})

const $textWrapper: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  gap: 10,
  justifyContent: "space-between",
  alignItems: "center",
})
