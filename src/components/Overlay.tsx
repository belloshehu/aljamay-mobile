import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ReactNode } from "react"
import { Modal, View, ViewStyle } from "react-native"

interface OverlayProps {
  children: ReactNode
  visible: boolean
}

export function Overlay({ children, visible = false }: OverlayProps) {
  const { themed } = useAppTheme()
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={themed($container)}>{children}</View>
    </Modal>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
})
