import { animationStyles } from "@/styles/animation.style"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ReactNode } from "react"
import { StyleProp, ViewStyle } from "react-native"
import Animated from "react-native-reanimated"

interface GlowWrapperProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  preset?: "rounded" | "flat"
  runGlow?: boolean
}
export function GlowWrapper({
  children,
  style,
  preset = "rounded",
  runGlow = false,
}: GlowWrapperProps) {
  const { themed } = useAppTheme()

  if (!runGlow) return children
  return (
    <Animated.View
      style={[
        themed($buttonWrapper),
        animationStyles.glowAnimation,
        preset === "rounded" && themed($buttonWrapper),
        style,
      ]}
      // animatedProps={{ animationPlayState: runGlow ? "running" : "paused" }}
    >
      {children}
    </Animated.View>
  )
}

const $buttonWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  // marginTop: spacing.md,
  borderRadius: spacing.xxl,
})
