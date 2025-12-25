import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/Text"
import { ShippingAddressType } from "types/shipping.types"
import { useCheckoutContext } from "@/context/CheckoutProvider"
import { Checkbox } from "@/components/Toggle/Checkbox"

interface ShippingAddressProps {
  shippingData: ShippingAddressType
  minimum?: boolean // if true, name street are shown
  selectable?: boolean
}
export const ShippingAddress: FC<ShippingAddressProps> = (props: ShippingAddressProps) => {
  const {
    shippingData: {
      firstName,
      lastName,
      city,
      country,
      phoneNumber,
      postalCode,
      streetAddress,
      state,
      isActive,
      isDefault,
      id,
    },
    minimum,
    selectable,
  } = props
  const { themed, theme } = useAppTheme()
  const { address, setAddress } = useCheckoutContext()

  const handlePress = () => {
    if (props.shippingData) setAddress(props.shippingData)
  }

  return (
    <Pressable
      style={themed(address?.id === id && selectable ? $selectedWrapper : $wrapper)}
      onPress={handlePress}
    >
      {selectable && <Checkbox value={address?.id === id} />}
      <View style={{ width: "100%" }}>
        <Text text={isDefault ? "Default" : ""} style={[themed($badge)]} />
        <Text
          text={firstName + " " + lastName}
          preset="default"
          style={[themed($name), { textDecorationLine: isActive ? "none" : "line-through" }]}
        />
        {<Text text={city + ", " + state + ", " + country} style={themed($text)} />}
        <Text text={streetAddress.trim()} style={themed($text)} />
        {<Text text={phoneNumber + ", " + postalCode} style={themed($text)} />}
      </View>
    </Pressable>
  )
}

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  backgroundColor: "#fff",
  padding: spacing.xs,
  borderRadius: spacing.xs,
  flexDirection: "row",
  gap: spacing.xs,
  alignItems: "flex-start",
})

const $selectedWrapper: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: "100%",
  backgroundColor: "#fff",
  padding: spacing.xs,
  borderRadius: spacing.xs,
  flexDirection: "row",
  gap: spacing.xs,
  alignItems: "flex-start",
  borderWidth: 1,
  borderColor: colors.errorBackground,
})

const $name: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.errorBackground,
})

const $text: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.md,
})

const $badge: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  color: colors.errorBackground,
  position: "absolute",
  right: 10,
  top: 0,
  backgroundColor: "#000",
  paddingHorizontal: spacing.sm,
  borderRadius: spacing.sm,
  fontSize: spacing.xs,
})
