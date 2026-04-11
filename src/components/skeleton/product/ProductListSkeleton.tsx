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
      <ProductSkeleton key={2} />
      <ProductSkeleton key={3} />
      <ProductSkeleton key={4} />
      <ProductSkeleton key={5} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({}) => ({
  gap: 5,
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
})
