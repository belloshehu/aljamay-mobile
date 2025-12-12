import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { Pressable, View, ViewStyle } from "react-native"

interface MessageProps {
  subject: string
  message: string
  createdAt: Date
}
export const Message: FC<MessageProps> = (props: MessageProps) => {
  const { themed } = useAppTheme()
  const { message, subject, createdAt } = props

  const onPress = () => {}
  return (
    <Pressable style={themed($wrapper)} onPress={onPress}>
      <View style={themed($header)}>
        <Text text={subject} preset="subheading" />
        <Text text={createdAt.toLocaleDateString()} />
      </View>
      <Text text={message.split(" ").slice(5).join(" ") + "..."} />
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

const $header: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
})
