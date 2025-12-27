// components/skeleton/SkeletonText.tsx
import React, { memo } from "react"
import { Skeleton } from "moti/skeleton"
import { DimensionValue, useColorScheme } from "react-native"

export type SkeletonButtonProps = {
  width?: DimensionValue
  height?: number
}

const SkeletonButton = ({ width = "100%", height = 20 }: SkeletonButtonProps) => {
  const colorScheme = useColorScheme()
  const colorMode = colorScheme === "dark" ? "dark" : "light"

  return (
    <Skeleton
      colorMode={colorMode}
      width={width} // Percentage, number, or 'auto'
      height={height} // Number (e.g., fontSize)
      radius={"round"}
    />
  )
}

export default memo(SkeletonButton)
