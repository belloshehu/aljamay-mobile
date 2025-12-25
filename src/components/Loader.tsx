import { FC } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { TxKeyPath } from "@/i18n"
interface LoaderProps {
  loadingText?: TxKeyPath
}
const Loader: FC<LoaderProps> = (props: LoaderProps) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($wrapper)}>
      <ActivityIndicator size={"large"} />
      <Text tx={props.loadingText || "common:loading"} />
    </View>
  )
}

export default Loader

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
})
