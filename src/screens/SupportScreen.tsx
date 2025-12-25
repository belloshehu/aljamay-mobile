import { FC } from "react"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { $styles } from "@/theme/styles"

import { Text } from "@/components/Text"

// @demo replace-next-line export const SupportScreen: FC = function SupportScreen(
export const SupportScreen: FC = function SupportScreen() {
  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <Text>We are here to support your journey on Aljamay</Text>
    </Screen>
  )
}

const $SupportFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
