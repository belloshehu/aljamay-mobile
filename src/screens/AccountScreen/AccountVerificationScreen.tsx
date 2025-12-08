import { FC, useState } from "react"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext" // @demo remove-current-line
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { useRouter } from "expo-router"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import AccountVerificationForm from "./AccountVerificationForm"
import { useRequestVerificationCode } from "@/hooks/service-hooks/auth.service.hook"

// @demo replace-next-line export const AccountVerificationScreen: FC = function AccountVerificationScreen(
export const AccountVerificationScreen: FC = function AccountVerificationScreen() {
  const { themed } = useAppTheme()
  const router = useRouter()
  const [verificationError, setverificationError] = useState("")
  const [enableCodeRequest, setEnableCodeRequest] = useState(false)
  const { refetch, error, isSuccess, isRefetching, isFetching } =
    useRequestVerificationCode(enableCodeRequest)
  const { logout } = useAuth()

  function requestCode() {
    // reguest verification code
    setEnableCodeRequest(true)
    if (enableCodeRequest) {
      refetch()
    }
  }

  return (
    <Screen preset="auto" contentContainerStyle={themed($screenContentContainer)}>
      <View style={themed($topContainer)}>
        <Text
          testID="verification-heading"
          tx="verification:heading"
          preset="heading"
          style={themed($logIn)}
        />
        <Text tx={"verification:detail"} />
        {verificationError && <Text text={verificationError} style={themed($error)} />}
      </View>

      <AccountVerificationForm setError={setverificationError} />
      <Button
        tx={isFetching || isRefetching ? "progress:wait" : "verification:resent"}
        onPress={requestCode}
        disabled={isRefetching || isFetching}
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

const $ProfileHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $names: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontWeight: "bold",
  color: colors.errorBackground,
  fontSize: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  backgroundColor: colors.errorBackground,
  width: "100%",
})

const $error: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})
