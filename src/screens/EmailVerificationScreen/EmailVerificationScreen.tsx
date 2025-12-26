import { FC, useEffect } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"
import { useVerifyEmail } from "@/hooks/service-hooks/auth.service.hook"
import { Button } from "@/components/Button"
import { useAxios } from "@/hooks/use-axios"
import { useLocalSearchParams } from "expo-router/build/hooks"
import { useTimer } from "@/hooks/useTimer"
import Config from "@/config"
import { push } from "expo-router/build/global-state/routing"

export const EmailVerificationScreen: FC = function EmailVerificationScreen() {
  const { themed } = useAppTheme()
  const { mutateAsync, isPending, isSuccess } = useVerifyEmail()
  const { protectedRequest } = useAxios()
  const { token } = useLocalSearchParams<{ token: string }>()
  const { getTimer, time } = useTimer({ duration: Config.CODE_RESEND_TIME, start: isSuccess })

  useEffect(() => {
    console.log("sending back token:", token)
    if (!isSuccess) {
      verifyEmail()
    }
  }, [token])

  function verifyEmail() {
    // reguest verification code
    mutateAsync({ protectedRequest, token })
  }

  function requestEmailVerificationLink() {
    push("/user/email-verify-request" as any)
  }

  return (
    <Screen preset="auto" contentContainerStyle={themed($screenContentContainer)}>
      <View style={themed($topContainer)}>
        <Text
          testID="verification-heading"
          tx="emailVerificationScreen:heading"
          preset="heading"
          style={themed($logIn)}
        />
        <Text tx={"emailVerificationScreen:detail"} />
      </View>

      <Button
        tx={isPending && time > 0 ? "common:wait" : "emailVerificationScreen:resendInFuture"}
        onPress={requestEmailVerificationLink}
        disabled={isPending && time > 0}
        preset="filled"
        textStyle={{ color: "#000" }}
        txOptions={{ time: getTimer() }}
      />
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

const $profileFace: ImageStyle = {
  height: 169,
  width: 269,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  resizeMode: "contain",
}

const $error: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})
