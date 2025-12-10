import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { goBack } from "expo-router/build/global-state/routing"
import { FC } from "react"
import {
  Pressable,
  ViewStyle,
  View,
  TextStyle,
  Image,
  ImageStyle,
  ImageBackground,
} from "react-native"
import { PromoItemType } from "types/promo.types"
import { PromoDate } from "../PromoScreen/PromoDate"
import { PromoCountDown } from "../PromoScreen/PromoCountDown"

interface PromoDetailHeaderProps {
  promo: PromoItemType
}
const PromoDetailHeader: FC<PromoDetailHeaderProps> = (props: PromoDetailHeaderProps) => {
  const {
    promo: { title, images, startDate, stopDate },
  } = props
  const { themed } = useAppTheme()

  const countDown = Math.round((startDate.getTime() - new Date().getTime()) / (60 * 60 * 1000 * 24))

  return (
    <View style={themed($header)}>
      <View style={themed($titleWrapper)}>
        <Pressable style={themed($backButton)} onPress={goBack}>
          <Icon icon="caretLeft" size={30} />
        </Pressable>
        <Text text={title} style={themed($titleText)} />
      </View>
      <ImageBackground
        source={images![0] as any}
        style={themed($bgImageContainer)}
        imageStyle={themed($image)}
      >
        <View
          style={{
            paddingHorizontal: 20,
            position: "absolute",
            bottom: 10,
            width: "100%",
            gap: 10,
          }}
        >
          <PromoDate startDate={startDate} stopDate={stopDate} />
          <PromoCountDown count={countDown.toString()} style={{ width: "50%", margin: "auto" }} />
        </View>
      </ImageBackground>
    </View>
  )
}

const $header: ThemedStyle<ViewStyle> = ({}) => ({
  flex: 0.65,
  width: "100%",
})

const $backButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.errorBackground,
  padding: spacing.xxs,
  borderRadius: spacing.lg,
})

const $titleWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: 20,
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingHorizontal: spacing.sm,
  position: "absolute",
  top: 30,
  zIndex: 10,
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.lg,
  fontWeight: "500",
})

const $bgImageContainer: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: "100%",
  height: 300,
})

const $image: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  borderBottomLeftRadius: spacing.xl,
  borderBottomRightRadius: spacing.xl,
  width: "100%",
})

export default PromoDetailHeader
