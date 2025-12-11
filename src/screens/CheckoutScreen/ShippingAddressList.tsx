import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FC } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { ShippingAddressType } from "types/shipping.types"
import Loader from "@/components/Loader"
import { Text } from "@/components/Text"
import { ShippingAddress } from "./ShippingAddress"
import { $separator } from "../ProductScreen/ProductList"

interface ShippingAddressListProps {
  addresses: ShippingAddressType[] | null | undefined
  isLoading: boolean
}
export const ShippingAddressList: FC<ShippingAddressListProps> = (
  props: ShippingAddressListProps,
) => {
  const { addresses, isLoading } = props
  const { themed } = useAppTheme()
  if (isLoading) return <Loader loadingText="checkout:shippingAddress.loading" />
  if (!addresses || addresses.length === 0) return <Text tx="checkout:shippingAddress.empty" />
  return (
    <View style={themed($wrapper)}>
      {addresses.map((address) => (
        <ShippingAddress shippingData={address} key={address.id} />
      ))}
    </View>
  )
}

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  gap: spacing.xs,
  backgroundColor: "#fff",
})
