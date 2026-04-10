import { useGetAllShippingAdressesByUser } from "@/hooks/service-hooks/shipping.service.hooks"
import { ShippingAddressList } from "../CheckoutScreen/ShippingAddressList"
import { FC } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { PressableIcon } from "@/components/Icon"
import Modal from "@/components/Modal"
import { AddShippingAddressModal } from "./AddShippingAddressModal"
import LottieView from "lottie-react-native"

export const ShippingAddressListScreen: FC = function AccountScreen() {
  const { themed, theme } = useAppTheme()

  const { isLoading, data: addresses } = useGetAllShippingAdressesByUser()

  if (isLoading)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$topContainer, { justifyContent: "center", alignItems: "center" }])}>
          <ActivityIndicator size={"large"} />
          <Text tx="cart:loading" />
        </View>
      </Screen>
    )

  if (!addresses || addresses.length === 0)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$topContainer])}>
          <LottieView
            source={require("@assets/animations/delivery.json")}
            autoPlay
            loop
            style={themed($animation)}
          />
          <Text tx="shippingAddressScreen:noAddress" style={{ textAlign: "center" }} />
          <Button
            tx="shippingAddressScreen:addAddress"
            preset="filled"
            style={{ width: "100%", marginTop: 10 }}
          />
        </View>
      </Screen>
    )

  return (
    <Screen preset="auto" contentContainerStyle={$styles.flex1}>
      <View style={themed($mainContainer)}>
        <View style={themed($header)}>
          <Text
            tx="shippingAddressScreen:title"
            txOptions={{ count: addresses.length }}
            preset="subheading"
          />

          <Modal
            TriggerComponent={({ onPress }) => (
              <PressableIcon
                icon="plus"
                size={24}
                color={theme.colors.errorBackground}
                onPress={onPress!}
              />
            )}
            RenderedModalChildren={AddShippingAddressModal}
          />
        </View>
        <ShippingAddressList addresses={addresses} isLoading={isLoading} />
      </View>
    </Screen>
  )
}

const $mainContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  flex: 1,
  width: "100%",
  gap: spacing.sm,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  width: "100%",
  flex: 1,
  gap: spacing.lg,
})

const $header: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
})

const $animation: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 150,
  height: 150,
})
