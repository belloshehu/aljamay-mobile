import { useGetAllShippingAdressesByUser } from "@/hooks/service-hooks/shipping.service.hooks"
import { AddShippingAddressModal } from "../ShippingAddressListScreen/AddShippingAddressModal"
import { ShippingAddressList } from "./ShippingAddressList"
import { PressableIcon } from "@/components/Icon"
import { View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Text } from "@/components/Text"
import Modal from "@/components/Modal"
import { FC } from "react"

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
        <Modal
          title="Add shipping Address"
          TriggerComponent={({ onPress }) => (
            <PressableIcon
              icon="plus"
              size={30}
              color={theme.colors.errorBackground}
              onPress={onPress!}
            />
          )}
          RenderedModalChildren={AddShippingAddressModal}
        />
      </View>
      <Text
        tx="profileScreen:shipping.selection"
        style={{ backgroundColor: "#eee", padding: 10, fontSize: 12 }}
      />
      <ShippingAddressList addresses={data} isLoading={isPending} selectable />
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
