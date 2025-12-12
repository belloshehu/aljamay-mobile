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
import { useAuth } from "@/context/AuthContext"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { push } from "expo-router/build/global-state/routing"
import { LoginScreen } from "../LoginScreen/LoginScreen"
import { $separator } from "../ProductScreen/ProductList"
import { Message } from "./Message"

// @demo replace-next-line export const ShoppingCartScreen: FC = function ShoppingCartScreen(
export const MessageListScreen: FC = () => {
  const { themed } = useAppTheme()
  const { isAuthenticated } = useAuth()
  const isLoading = false
  const data: any[] | null = []

  if (!isAuthenticated) return <LoginScreen />

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
            { justifyContent: "center", alignItems: "center", gap: 5 },
          ])}
        >
          <Image
            source={require("@assets/images/message_bubble.png")}
            width={50}
            height={50}
            style={themed($shoppingCart)}
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

const $shoppingCart: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 300,
  width: 300,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  resizeMode: "contain",
  borderRadius: spacing.xxl,
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 20,
  fontWeight: "500",
})
