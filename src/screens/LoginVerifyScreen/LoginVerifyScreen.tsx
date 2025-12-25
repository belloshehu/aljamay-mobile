import { FC, useEffect } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { push } from "expo-router/build/global-state/routing"
import { useLocalSearchParams } from "expo-router"
import { useLoginVerify } from "@/hooks/service-hooks/auth.service.hook"
import { useAxios } from "@/hooks/use-axios"
import { useTimer } from "@/hooks/useTimer"

/*
 * Screen where user will redirected to from email using magic link.
 * It automatically send the embedded token back to the server for verification on initial rendering.
 * User can also click on the button to resent the token once again if the first one fails.
 */

export const LoginVerifyScreen: FC = function ResetPasswordScreen() {
  const { themed } = useAppTheme()
  const { token } = useLocalSearchParams() as { token: string }
  const { mutateAsync, isPending } = useLoginVerify()
  const { protectedRequest } = useAxios()
  const { time, getTimer } = useTimer({ duration: 60 }) // wait for two minutes incase of delay in receiving the magic link

  useEffect(() => {
    sendTokenBack()
  }, [])

  const sendTokenBack = () => {
    mutateAsync({ protectedRequest, token })
  }

  const backToLogin = () => push("/user/login")
  return (
    <Screen preset="auto" contentContainerStyle={themed($screenContentContainer)}>
      <View style={themed($topContainer)}>
        <Text
          testID="login-verification-heading"
          tx="loginVerificationScreen:title"
          preset="heading"
          style={themed($logIn)}
        />
        <Text tx={"loginVerificationScreen:detail"} />
      </View>
      <Text
        tx="loginVerificationScreen:waitToConfirm"
        txOptions={{ time: getTimer() }}
        style={{ textAlign: "center" }}
      />
      <Button
        tx={isPending && time > 0 ? "common:wait" : "common:confirm"}
        onPress={sendTokenBack}
        disabled={isPending}
        preset="filled"
        textStyle={{ color: "#000" }}
      />
      <Button tx={"loginVerificationScreen:backToLogin"} onPress={backToLogin} />
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
