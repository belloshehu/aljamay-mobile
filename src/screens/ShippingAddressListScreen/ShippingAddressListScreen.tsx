import { FC } from "react"
import { ActivityIndicator, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { useGetAllShippingAdressesByUser } from "@/hooks/service-hooks/shipping.service.hooks"
import { ShippingAddressList } from "../CheckoutScreen/ShippingAddressList"
import { PressableIcon } from "@/components/Icon"
import Modal from "@/components/Modal"
import { AddShippingAddressModal } from "./AddShippingAddressModal"

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
        <View
          style={themed([
            $topContainer,
            { justifyContent: "center", alignItems: "center", gap: 5 },
          ])}
        >
          <Image source={require("@assets/images/cart.png")} width={50} height={50} />
          <Text tx="cart:noItems" />
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
            renderedModalChildren={<AddShippingAddressModal />}
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
  justifyContent: "flex-start",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  width: "100%",
  flex: 0.7,
  gap: spacing.xs,
})

const $profileFace: ImageStyle = {
  height: 169,
  width: 269,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  resizeMode: "contain",
}

const $names: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontWeight: "bold",
  color: colors.errorBackground,
  fontSize: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  backgroundColor: colors.errorBackground,
  width: "100%",
})

const $header: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
})
