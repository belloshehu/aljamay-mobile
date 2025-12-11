import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components/Text"
import { ShippingAddressType } from "types/shipping.types"

interface ShippingAddressProps {
  shippingData: ShippingAddressType
  minimum?: boolean // if true, name street are shown
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
    },
    minimum,
  } = props
  const { themed } = useAppTheme()
  console.log(firstName, minimum)
  return (
    <View style={themed($wrapper)}>
      <Text text={isDefault ? "Default" : ""} style={[themed($badge)]} />
      <Text
        text={firstName + " " + lastName}
        preset="default"
        style={[themed($name), { textDecorationLine: isActive ? "none" : "line-through" }]}
      />
      {!minimum && <Text text={city + ", " + state + ", " + country} />}
      <Text text={streetAddress} />
      {!minimum && <Text text={phoneNumber + ", " + postalCode} />}
    </View>
  )
}

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  backgroundColor: "#fff",
  padding: spacing.xs,
  borderRadius: spacing.xs,
})

const $name: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.errorBackground,
})

const $badge: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  color: colors.errorBackground,
  position: "absolute",
  right: 10,
  top: 10,
  backgroundColor: "#000",
  paddingHorizontal: spacing.sm,
  borderRadius: spacing.sm,
  fontSize: spacing.sm,
})
