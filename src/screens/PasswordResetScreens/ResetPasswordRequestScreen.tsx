import { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"

import { goBack, push } from "expo-router/build/global-state/routing"
import ResetPasswordRequestForm from "./ResetPasswordRequestForm"

// @demo replace-next-line export const AccountVerificationScreen: FC = function AccountVerificationScreen(
export const ResetPasswordRequestScreen: FC = function ResetPasswordRequestScreen() {
  const { themed } = useAppTheme()
  const [error, setError] = useState("")

  return (
    <Screen preset="auto" contentContainerStyle={themed($screenContentContainer)}>
      <View style={themed($topContainer)}>
        <Text
          testID="verification-heading"
          tx="verification:forgotPassword.heading"
          preset="heading"
          style={themed($logIn)}
        />
        <Text tx={"verification:forgotPassword.confirm"} />
        {error && <Text text={error} style={themed($error)} />}
      </View>

      <ResetPasswordRequestForm setError={setError} />
      <Button tx={"common:cancel"} onPress={() => push("/user/login")} />
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

const $error: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})
