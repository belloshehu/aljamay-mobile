import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import React from "react"
import { View, ViewStyle } from "react-native"
import { ProductSkeleton } from "./ProductSkeleton"

export const ProductListSkeleton = ({ count = 10 }) => {
  const { themed } = useAppTheme()
  const dummyProducts = new Array(count)

  return (
    <View style={themed($container)}>
      {dummyProducts.map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
      <ProductSkeleton />
      <ProductSkeleton key={23} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({}) => ({
  gap: 2,
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
})
