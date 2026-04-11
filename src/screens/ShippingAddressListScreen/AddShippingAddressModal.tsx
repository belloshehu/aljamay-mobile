import { FC, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { TextStyle, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import ShippingAddressForm from "./ShippingAddressForm"
import { Screen } from "@/components/Screen"

interface AddShippingAddressModalProps {
  onClose?: () => void
}

export const AddShippingAddressModal: FC<AddShippingAddressModalProps> = ({
  onClose,
}: AddShippingAddressModalProps) => {
  const [err, setErr] = useState("")
  const { themed } = useAppTheme()

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      {err && <Text text={err} style={themed($error)} />}

      <ShippingAddressForm setError={setErr} onClose={onClose} />
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxxl,
  paddingHorizontal: spacing.lg,
})

const $error: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})
