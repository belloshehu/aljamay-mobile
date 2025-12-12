import { Icon, IconTypes } from "@/components/Icon"
import { Text } from "@/components/Text"
import { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { Pressable, View, ViewStyle } from "react-native"

interface AccountItemProps {
  icon: IconTypes
  title: TxKeyPath
  count?: number
  onPress?: () => void
}
export const AccountItem: FC<AccountItemProps> = (props: AccountItemProps) => {
  const { icon, title, onPress, count = 0 } = props
  const { themed, theme } = useAppTheme()

  return (
    <Pressable style={themed($wrapper)} onPress={onPress}>
      <View style={themed($titleWrapper)}>
        <Icon icon={icon} color={theme.colors.errorBackground} />
        <Text tx={title} txOptions={{ count }} />
      </View>
      <Icon icon={"caretRight"} color={theme.colors.errorBackground} />
    </Pressable>
  )
}

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: "#fff",
  padding: spacing.xs,
})

const $titleWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  padding: spacing.xs,
})
