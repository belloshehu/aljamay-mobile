import { FC, useState } from "react"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext" // @demo remove-current-line
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useRouter } from "expo-router"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import styles from "toastify-react-native/components/styles"
import { useRequestVerificationCode } from "@/hooks/service-hooks/auth.service.hook"

const defaultProfileImage = require("@assets/images/users/man.png")
// @demo replace-next-line export const AccountScreen: FC = function AccountScreen(
export const AccountScreen: FC = function AccountScreen() {
  const { themed, theme } = useAppTheme()
  const { logout, isAuthenticated, authToken, user } = useAuth()
  const router = useRouter()
  const [enableCodeRequest, setEnableCodeRequest] = useState(false)
  const { refetch, error, isSuccess, isRefetching, isFetching } =
    useRequestVerificationCode(enableCodeRequest)

  function verifyAccount() {
    // reguest verification code
    setEnableCodeRequest(true)
    if (enableCodeRequest) {
      refetch()
    }
    if (isSuccess) {
      router.push("/(app)/(tabs)/user/(auth)/verification")
    }
  }

  return (
    <Screen preset="auto" contentContainerStyle={$styles.flex1}>
      <View style={themed($mainContainer)}>
        <View style={themed($topContainer)}>
          <Image source={defaultProfileImage} style={themed($profileFace)} />
          <Text text={user?.firstName + " " + user?.lastName} style={themed($names)} />
          <Text text={user?.email} />
        </View>

        {error && <Text text={error.message} />}
        {!user?.verified && (
          <Button
            tx={isFetching || isRefetching ? "progress:wait" : "verification:goToVerification"}
            onPress={verifyAccount}
            style={themed($tapButton)}
            disabled={isRefetching || isFetching}
          />
        )}
        <Button text="Log out" onPress={logout} style={{ width: "100%" }} />
      </View>
    </Screen>
  )
}

const $mainContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  flex: 1,
  width: "100%",
  gap: spacing.sm,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  width: "100%",
  flex: 0.92,
  gap: spacing.xs,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
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
