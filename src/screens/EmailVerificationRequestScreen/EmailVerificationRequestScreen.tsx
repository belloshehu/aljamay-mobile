import { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"
import EmailVerificationRequestForm from "./EmailVerificationRequestForm"

export const EmailVerificationRequestScreen: FC = function EmailVerificationScreen() {
  const { themed } = useAppTheme()
  const [error, setError] = useState("")

  return (
    <Screen preset="auto" contentContainerStyle={themed($screenContentContainer)}>
      <View style={themed($topContainer)}>
        <Text
          testID="verification-heading"
          tx="emailVerificationRequestScreen:heading"
          preset="heading"
          style={themed($logIn)}
        />
        <Text tx={"emailVerificationRequestScreen:detail"} />
        {error && <Text text={error} style={themed($error)} />}
        <EmailVerificationRequestForm setError={setError} />
      </View>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  gap: spacing.xl,
  flex: 1,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  width: "100%",
  gap: spacing.md,
})

const $logIn: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.sm,
  color: colors.palette.primary500,
})

const $error: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})
