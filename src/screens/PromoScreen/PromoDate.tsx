import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

interface PromoDateProps {
  startDate: Date
  stopDate: Date
}
export const PromoDate: FC<PromoDateProps> = (props: PromoDateProps) => {
  const { startDate, stopDate } = props
  const { themed } = useAppTheme()
  return (
    <View style={themed($dateWrapper)}>
      <Text text={startDate.toLocaleDateString()} style={themed($date)} />
      <Text text="-" style={themed($separator)} />
      <Text text={stopDate.toLocaleDateString()} style={themed($date)} />
    </View>
  )
}

export const $dateWrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 2,
  borderRadius: spacing.xxxl,
  width: "auto",
  padding: spacing.xxs,
  paddingHorizontal: spacing.sm,
  backgroundColor: "rgba(0, 0, 0, 1)",
  flexDirection: "row",
  justifyContent: "center",
  borderWidth: 0,
  borderColor: colors.errorBackground,
})

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

const $date: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: "#fff",
  fontSize: spacing.sm,
})

const $separator: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: "#fff",
  fontSize: spacing.xl,
})
