import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { push } from "expo-router/build/global-state/routing"
import { FC } from "react"
import { ImageBackground, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { PromoDate } from "./PromoDate"
import { PromoCountDown } from "./PromoCountDown"
import { animationStyles } from "@/styles/animation.style"
import Animated from "react-native-reanimated"
import { PromoItemType } from "types/promo.types"

interface PromoProps {
  promo: PromoItemType
}
export const Promo: FC<PromoProps> = (props: PromoProps) => {
  const {
    promo: { title, description, images, startDate, stopDate, id },
  } = props
  const { themed } = useAppTheme()
  const countDown = Math.round((startDate.getTime() - new Date().getTime()) / (60 * 60 * 1000 * 24))

  const goToDetail = () => {
    push(("/promo/" + id) as any)
  }
  return (
    <Pressable onPress={goToDetail}>
      <ImageBackground
        source={images![0] as any}
        style={themed($container)}
        imageStyle={themed($image)}
      >
        <View style={themed($content)}>
          <Animated.Text
            children={title}
            style={[themed($title), animationStyles.slideInYAmination]}
          />
          <PromoDate startDate={startDate} stopDate={stopDate} />
          <PromoCountDown count={countDown.toString()} />
        </View>
      </ImageBackground>
    </Pressable>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderRadius: spacing.md,
  width: "100%",
  borderWidth: 1,
  borderColor: colors.border,
})

const $content: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 5,
  width: "100%",
  padding: spacing.xl,
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: spacing.md,
})

export const $dateWrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 2,
  borderRadius: spacing.xxxl,
  width: "auto",
  padding: spacing.xxs,
  backgroundColor: "rgba(0, 0, 0, 0.65)",
  flexDirection: "row",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: colors.errorBackground,
})

const $image: ThemedStyle<ImageStyle> = ({ spacing, colors }) => ({
  width: "100%",
  overlayColor: "#000",
  borderRadius: spacing.md,
  borderWidth: 1,
  borderColor: colors.separator,
})

const $title: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontWeight: "bold",
  color: "#fff",
  fontSize: spacing.md,
  width: "100%",
  textAlign: "center",
  borderRadius: spacing.lg,
  padding: spacing.sm,
})
