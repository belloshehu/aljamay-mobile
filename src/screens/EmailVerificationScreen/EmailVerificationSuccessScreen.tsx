import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { push } from "expo-router/build/global-state/routing"

/*
    After successful request email verification, user is redirected here.

*/
export const EmailVerificationSuccessScreen: FC = () => {
  const { themed } = useAppTheme()

  return (
    <Screen preset="auto" contentContainerStyle={themed($screenContentContainer)}>
      <View style={themed($topContainer)}>
        <Text
          testID="email-verification-link-success"
          tx="emailVerificationSuccessScreen:heading"
          preset="heading"
          style={themed($logIn)}
        />
        <Text tx={"emailVerificationSuccessScreen:detail"} />
      </View>
      <Button
        tx="emailVerificationScreen:goToLogin"
        preset="filled"
        textStyle={{ color: "#000" }}
        onPress={() => push("/user/login")}
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
