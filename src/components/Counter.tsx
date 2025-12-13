import { FC } from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
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
      <Pressable
        onPress={onDecrese}
        style={themed([$countButton, buttonStyle, decreaseButtonStyle])}
      >
        <Text style={themed([$countBtnTextStyle, buttonTextStyle])}>
          {decreaseButtonText || "-"}
        </Text>
      </Pressable>
      <Text text={count.toString()} style={themed([$countTextStyle, countTextStyle])} />
      <Pressable
        onPress={onIncrease}
        style={themed([$countButton, buttonStyle, increaseButtonStyle])}
      >
        <Text style={themed([$countBtnTextStyle, buttonTextStyle])}>
          {increaseButtonText || "+"}
        </Text>
      </Pressable>
    </View>
  )
}

const $countButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  padding: spacing.xs,
  paddingHorizontal: spacing.lg,
  borderWidth: 1,
  borderRadius: spacing.md,
  borderColor: colors.errorBackground,
})

const $countBtnTextStyle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontWeight: "500",
  fontSize: spacing.xl,
  color: colors.errorBackground,
  textAlign: "center",
})

const $countTextStyle: ThemedStyle<TextStyle> = ({}) => ({
  fontWeight: "bold",
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
