import { FC } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Button } from "./Button"
import { Text } from "./Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

interface CounterProps {
  onDecrese: () => void
  onIncrease: () => void
  count: number
  increaseButtonText?: string
  decreaseButtonText?: string
  wrapperStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  buttonTextStyle?: StyleProp<TextStyle>
  increaseButtonStyle?: StyleProp<ViewStyle>
  decreaseButtonStyle?: StyleProp<ViewStyle>
  countTextStyle?: StyleProp<TextStyle>
}

export const Counter: FC<CounterProps> = (props: CounterProps) => {
  const { themed } = useAppTheme()
  const {
    onDecrese,
    onIncrease,
    count,
    wrapperStyle,
    buttonStyle,
    buttonTextStyle,
    decreaseButtonStyle,
    increaseButtonStyle,
    decreaseButtonText,
    increaseButtonText,
    countTextStyle,
  } = props
  return (
    <View style={themed([$countWrapper, wrapperStyle])}>
      <Button
        text={decreaseButtonText || "-"}
        onPress={onDecrese}
        style={themed([$countButton, buttonStyle, decreaseButtonStyle])}
        textStyle={themed([$countBtnTextStyle, buttonTextStyle])}
      />
      <Text text={count.toString()} style={themed([$countTextStyle, countTextStyle])} />
      <Button
        text={increaseButtonText || "+"}
        onPress={onIncrease}
        style={themed([$countButton, buttonStyle, increaseButtonStyle])}
        textStyle={themed([$countBtnTextStyle, buttonTextStyle])}
      />
    </View>
  )
}

const $countButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xl,
})

const $countBtnTextStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontWeight: "500",
  fontSize: spacing.lg,
})

const $countTextStyle: ThemedStyle<TextStyle> = ({}) => ({
  fontWeight: "500",
  textAlign: "center",
})

const $countWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
})
