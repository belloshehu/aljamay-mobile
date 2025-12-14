import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import { useGetAllShippingAdressesByUser } from "@/hooks/service-hooks/shipping.service.hooks"
import { ShippingAddressList } from "./ShippingAddressList"
import { Button } from "@/components/Button"
import { PressableIcon } from "@/components/Icon"
import Modal from "@/components/Modal"
import { AddShippingAddressModal } from "../ShippingAddressListScreen/AddShippingAddressModal"

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
          renderedModalChildren={<AddShippingAddressModal />}
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
