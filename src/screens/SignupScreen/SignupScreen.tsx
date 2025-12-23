import { FC, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { Pressable, TextStyle, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { useRouter } from "expo-router"
import BrandLogo from "@/components/BrandLogo"
import SignupForm from "./SignupForm"

export const SignUpScreen: FC = () => {
  const router = useRouter()
  const [err, setErr] = useState("")

  const { themed } = useAppTheme()

  function goToLogin() {
    router.push("/(app)/(tabs)/user/(auth)/login")
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <BrandLogo />
      <Text
        testID="signup-heading"
        tx="signupScreen:signUp"
        preset="heading"
        style={themed($signUp)}
      />
      {err && <Text text={err} style={themed($error)} />}

      <SignupForm setError={setErr} />

      <Pressable onPress={goToLogin}>
        <Text tx="signupScreen:goToLogin" style={themed($loginButton)} />
      </Pressable>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $signUp: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.sm,
  color: colors.palette.primary500,
})

const $error: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})

const $loginButton: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.lg,
  textAlign: "center",
  color: colors.palette.primary500,
})

// @demo remove-file
