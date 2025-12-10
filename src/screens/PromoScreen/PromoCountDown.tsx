import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

interface PromoCountDownProps {
  count: string
  style?: StyleProp<ViewStyle>
}
export const PromoCountDown: FC<PromoCountDownProps> = (props: PromoCountDownProps) => {
  const { themed } = useAppTheme()

  return (
    <View style={themed([$dateCountDown, props.style])}>
      <Text
        tx={"promo:countDown"}
        txOptions={{ days: props.count }}
        style={themed($dateCountDownText)}
      />
    </View>
  )
}

export const $dateCountDown: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 2,
  width: "auto",
  height: 30,
  paddingHorizontal: spacing.md,
  backgroundColor: colors.errorBackground,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: spacing.md,
})

export const $dateCountDownText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  color: "#000",
  fontSize: spacing.sm,
  textAlign: "center",
})
