import { FC } from "react"
import { ImageStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
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
