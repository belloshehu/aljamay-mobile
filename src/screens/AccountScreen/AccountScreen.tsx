import { FC, useMemo, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext" // @demo remove-current-line
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useRouter } from "expo-router"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { useRequestEmailVerificationCode } from "@/hooks/service-hooks/auth.service.hook"
import { AccountItem } from "./AccountItem"
import { adminAccountItem, userAccountItem } from "@/constants"
import withAuth from "@/components/HOC/withAuth"

const defaultProfileImage = require("@assets/images/users/man.png")
// @demo replace-next-line export const AccountScreen: FC = function AccountScreen(
const AccountScreen: FC = function AccountScreen() {
  const { themed } = useAppTheme()
  const { logout, user } = useAuth()
  const router = useRouter()
  const [enableCodeRequest, setEnableCodeRequest] = useState(false)
  const { refetch, error, isSuccess, isRefetching, isFetching } =
    useRequestEmailVerificationCode(enableCodeRequest)

  const renderAccountItems = useMemo(() => {
    if (user?.role === "ADMIN") {
      return adminAccountItem.map((item, index) => (
        <AccountItem
          key={index}
          icon={item.icon}
          title={item.title}
          count={item.count}
          onPress={item.onPress}
        />
      ))
    } else if (user?.role === "USER") {
      return userAccountItem.map((item, index) => (
        <AccountItem
          key={index}
          icon={item.icon}
          title={item.title}
          count={item.count}
          onPress={item.onPress}
        />
      ))
    } else {
      return <Text text="No account items available" />
    }
  }, [])
  function verifyAccount() {
    // reguest verification code
    setEnableCodeRequest(true)
    if (enableCodeRequest) {
      refetch()
    }
    if (isSuccess) {
      router.push("/user/email-verification")
    }
  }

  return (
    <Screen preset="auto" contentContainerStyle={[$styles.flex1]}>
      <View style={themed($mainContainer)}>
        <View style={themed($topContainer)}>
          <Image source={defaultProfileImage} style={themed($profileFace)} />
          <Text text={user?.firstName + " " + user?.lastName} style={themed($names)} />
          <Text text={user?.email} />
        </View>
        <View style={{ gap: 5, flex: 1, justifyContent: "flex-start" }}>{renderAccountItems}</View>

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
  flex: 0.7,
  gap: spacing.xs,
})

const $profileFace: ImageStyle = {
  height: 169,
  width: 269,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  resizeMode: "contain",
}

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

export default withAuth(AccountScreen)
