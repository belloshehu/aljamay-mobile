import { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext" // @demo remove-current-line
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useRouter } from "expo-router"
import PromoList from "./PromoList"
import { dummyPromo } from "@/constants"

// @demo replace-next-line export const PromoScreen: FC = function PromoScreen(
export const PromoScreen: FC = function PromoScreen() {
  const { themed } = useAppTheme()
  const router = useRouter()

  function goNext() {
    router.push("/user/login")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <PromoList promos={dummyPromo} isLoading={false} />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.lg,
})

const $PromoFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $promoHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
