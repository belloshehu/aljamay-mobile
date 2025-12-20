import { FC, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { TextStyle, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import ProductForm from "../ProductScreen/ProductForm"
import { Screen } from "@/components/Screen"

interface AddProductModalProps {
  // onClose function to close the modal
  onClose?: () => void
}
export const AddProductModal: FC<AddProductModalProps> = ({ onClose }: AddProductModalProps) => {
  const [err, setErr] = useState("")
  const { themed } = useAppTheme()

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      //   safeAreaEdges={["top", "bottom"]}
    >
      {err && <Text text={err} style={themed($error)} />}

      <ProductForm setError={setErr} onClose={onClose} />
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.lg,
})

const $error: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
})
