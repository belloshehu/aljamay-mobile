import { FC, useState } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { useRouter } from "expo-router"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import AccountVerificationForm from "./AccountVerificationForm"
import { useRequestEmailVerificationCode } from "@/hooks/service-hooks/auth.service.hook"

// @demo replace-next-line export const AccountVerificationScreen: FC = function AccountVerificationScreen(
export const AccountVerificationScreen: FC = function AccountVerificationScreen() {
  const { themed } = useAppTheme()
  const [verificationError, setverificationError] = useState("")
  const [enableCodeRequest, setEnableCodeRequest] = useState(false)
  const { refetch, isRefetching, isFetching, data } =
    useRequestEmailVerificationCode(enableCodeRequest)

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
        {verificationError ? (
          <Text text={verificationError} style={themed($error)} />
        ) : (
          data?.message && <Text text={data.message} />
        )}
      </View>

      <AccountVerificationForm
        setError={setverificationError}
        isRequesting={isFetching || isRefetching}
        requestCode={requestCode}
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
