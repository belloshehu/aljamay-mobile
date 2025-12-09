import { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"

/*
    After successful request for password reset link, user is redirected here.

*/
export const PasswordResetRequestSuccessScreen: FC = () => {
  const { themed } = useAppTheme()
  const [error, setError] = useState("")

  return (
    <Screen preset="auto" contentContainerStyle={themed($screenContentContainer)}>
      <View style={themed($topContainer)}>
        <Text
          testID="password-reset-link-success"
          tx="verification:forgotPassword.linkRequestSuccess.heading"
          preset="heading"
          style={themed($logIn)}
        />
        <Text tx={"verification:forgotPassword.linkRequestSuccess.detail"} />
      </View>
      <Button tx="verification:forgotPassword.linkRequestSuccess.okButton" />
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
})

const $logIn: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.sm,
  color: colors.palette.primary500,
})
