import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { Pressable, TextInput, TextStyle, ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { useRouter } from "expo-router"
import BrandLogo from "@/components/BrandLogo"
import LoginForm from "./LoginForm"

export const LoginScreen: FC = () => {
  const authPasswordInput = useRef<TextInput>(null)
  const [loginError, setLoginError] = useState("")

  const {
    themed,
    theme: { colors },
  } = useAppTheme()
  const router = useRouter()

  function goToSignup() {
    router.push("/(app)/(tabs)/user/(auth)/signup")
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <BrandLogo />
      <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" style={themed($logIn)} />

      {loginError && <Text text={loginError} style={themed($error)} />}

      <LoginForm setError={setLoginError} />
      <Pressable onPress={goToSignup}>
        <Text tx="loginScreen:goToSignup" style={themed($signupButton)} />
      </Pressable>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $logIn: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.sm,
  color: colors.palette.primary500,
})

const $error: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})

const $signupButton: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.lg,
  textAlign: "center",
  color: colors.palette.primary500,
})

// @demo remove-file
