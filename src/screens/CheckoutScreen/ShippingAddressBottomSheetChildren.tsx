import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import { useGetAllShippingAdressesByUser } from "@/hooks/service-hooks/shipping.service.hooks"
import { ShippingAddressList } from "./ShippingAddressList"
import { PressableIcon } from "@/components/Icon"

interface ShippingAddressBottomSheetChildrenProps {}
export const ShippingAddressBottomSheetChildren: FC<ShippingAddressBottomSheetChildrenProps> = (
  props: ShippingAddressBottomSheetChildrenProps,
) => {
  const { isPending, data } = useGetAllShippingAdressesByUser()
  const { themed, theme } = useAppTheme()
  return (
    <View style={themed($wrapper)}>
      <View style={themed($header)}>
        <Text text="Shipping Address" preset="subheading" />
        <PressableIcon icon="plus" size={30} color={theme.colors.errorBackground} />
      </View>
      <ShippingAddressList addresses={data} isLoading={isPending} selectable />
      {/* <Button
        // textStyle={themed($orderButtonText)}
        tx="checkout:shippingAddress.addAddress"
        preset="reversed"
        // style={themed($orderButton)}
      /> */}
    </View>
  )
}

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  gap: spacing.md,
  paddingBottom: spacing.lg,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: spacing.xs,
})
