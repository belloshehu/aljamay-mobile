import { FC } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { push } from "expo-router/build/global-state/routing"
import { $separator } from "../ProductScreen/ProductList"
import { Message } from "./Message"
import LottieView from "lottie-react-native"

// @demo replace-next-line export const ShoppingCartScreen: FC = function ShoppingCartScreen(
const MessageListScreen: FC = () => {
  const { themed } = useAppTheme()
  const isLoading = false
  const data: any[] | null = []

  if (isLoading)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$topContainer, { justifyContent: "center", alignItems: "center" }])}>
          <ActivityIndicator size={"large"} />
          <Text tx="messageScreen:loadingMany" />
        </View>
      </Screen>
    )

  if (!data || data.length === 0)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View
          style={themed([
            $topContainer,
            { justifyContent: "flex-start", alignItems: "center", gap: 5 },
          ])}
        >
          <LottieView
            source={require("@assets/animations/message.json")}
            autoPlay
            loop
            style={themed($animation)}
          />
          <Text tx="messageScreen:emptyMany" />
          <Button
            tx="messageScreen:goToProfile"
            preset="filled"
            style={{ width: "100%", marginTop: 10 }}
            onPress={() => push("/user")}
          />
        </View>
      </Screen>
    )
  return (
    <Screen preset="fixed" contentContainerStyle={{ ...$styles.flex1, padding: 0, margin: 0 }}>
      <View style={themed($topContainer)}>
        <View style={themed($header)}>
          <Text
            tx="messageScreen:title"
            txOptions={{ count: data.length }}
            style={themed($titleText)}
            preset="subheading"
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Message {...item} key={item.id} />}
          ItemSeparatorComponent={() => <View style={themed($separator)} />}
        />
      </View>
    </Screen>
  )
}

const $header: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.lg,
  gap: spacing.sm,
  paddingBottom: spacing.xs,
})

const $animation: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 450,
  height: 350,
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 20,
  fontWeight: "500",
})

export default MessageListScreen
