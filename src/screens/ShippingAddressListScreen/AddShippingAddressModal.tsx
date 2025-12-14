import { FC, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import ShippingAddressForm from "./ShippingAddressForm"

export const AddShippingAddressModal: FC = () => {
  const [err, setErr] = useState("")
  const { themed } = useAppTheme()

  return (
    <ScrollView
      //   preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      //   safeAreaEdges={["top", "bottom"]}
    >
      {err && <Text text={err} style={themed($error)} />}

      <ShippingAddressForm setError={setErr} />
    </ScrollView>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
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
