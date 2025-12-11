import { FC, useEffect, useMemo } from "react"
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
import { LoginScreen } from "@/screens/LoginScreen/LoginScreen"
import { useGetCartItems } from "@/hooks/service-hooks/cart.service.hooks"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { replace } from "expo-router/build/global-state/routing"
import { CartItem } from "@/components/shoppingCart/CartItem"
import Price from "@/components/product/Price"
import { PressableIcon } from "@/components/Icon"
import { useBottomSheetContext } from "@/context/BottomSheetContext"
import { ShippingAddressBottomSheetChildren } from "./ShippingAddressBottomSheetChildren"
import { useGetDefaultShippingAddress } from "@/hooks/service-hooks/shipping.service.hooks"
import { ShippingAddress } from "./ShippingAddress"
import Loader from "@/components/Loader"
import { PaymentButton } from "@/screens/CheckoutScreen/PaymentButton"

// @demo replace-next-line export const CheckoutScreen: FC = function CheckoutScreen(
export const CheckoutScreen: FC = function CheckoutScreen() {
  const { themed } = useAppTheme()
  const { isAuthenticated } = useAuth()
  const { isLoading, data } = useGetCartItems()
  const { setBottomChildren, handleModalPreset } = useBottomSheetContext()
  const { data: defaultAddress, isLoading: loadingDefaultAddress } = useGetDefaultShippingAddress()

  useEffect(() => {
    if (!data || data.length === 0) {
      replace("/shopping")
    }
  })
  const addProduct = () => {
    replace("/")
  }

  const totalPrice = useMemo(() => {
    if (data) {
      return data?.reduce((prev, next) => prev + next.product.price * next.quantity, 0)
    }
    return 0
  }, [data])

  const totalDiscount = useMemo(() => {
    if (data) {
      return data?.reduce((prev, next) => prev + next.product.discount * next.quantity, 0)
    }
    return 0
  }, [data])

  const showAddressBottomSheet = () => {
    setBottomChildren(<ShippingAddressBottomSheetChildren />)
    handleModalPreset()
  }

  const showShippingMethodBottomSheet = () => {
    setBottomChildren(
      <View>
        <Text text="Shipping Methods" preset="subheading" />
      </View>,
    )
    handleModalPreset()
  }

  if (!isAuthenticated) return <LoginScreen />

  if (isLoading)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed([$container, { justifyContent: "center", alignItems: "center" }])}>
          <ActivityIndicator size={"large"} />
          <Text tx="cart:loading" />
        </View>
      </Screen>
    )

  if (!data || data.length === 0)
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View
          style={themed([$container, { justifyContent: "center", alignItems: "center", gap: 5 }])}
        >
          <Image
            source={require("@assets/images/cart.png")}
            width={50}
            height={50}
            style={themed($Checkout)}
          />
          <Text tx="cart:noItems" />
          <Button
            tx="cart:add"
            preset="filled"
            style={{ width: "100%", marginTop: 10 }}
            onPress={addProduct}
          />
        </View>
      </Screen>
    )
  return (
    <Screen preset="fixed" contentContainerStyle={{ ...$styles.flex1, padding: 0, margin: 0 }}>
      <View style={themed($container)}>
        <View style={themed($header)}>
          <Text tx="checkout:title" txOptions={{ count: data.length }} style={themed($titleText)} />
          <Price price={totalPrice} priceStyle={themed($priceText)} discount={totalDiscount} />
        </View>
        <View style={{ flex: 0.5 }}>
          <Text tx="checkout:productSection.count" txOptions={{ count: data.length }} />
          <FlatList
            contentContainerStyle={themed($horizontalScroll)}
            horizontal={true}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CartItem {...item} key={item.id} />}
          />
        </View>

        {/* Shipping Method section to allow user select a desired method of shipping */}
        <View style={{ flex: 0.3 }}>
          <View style={themed($header)}>
            <Text tx="checkout:shippinMethod.title" />
            <PressableIcon
              icon="caretRight"
              onPress={showShippingMethodBottomSheet}
              style={themed($icon)}
            />
          </View>
        </View>

        {/* Shipping Address section to allow user enter shipping address */}
        <View style={{ flex: 0.3, width: "100%" }}>
          <View style={themed($header)}>
            <Text tx="checkout:shippingAddress.title" />
            <PressableIcon
              icon="caretRight"
              onPress={showAddressBottomSheet}
              style={themed($icon)}
            />
          </View>
          {loadingDefaultAddress ? (
            <Loader loadingText="checkout:shippingAddress.loading" />
          ) : defaultAddress && defaultAddress.length > 0 ? (
            <ShippingAddress shippingData={defaultAddress![0]} minimum />
          ) : (
            <Text tx="checkout:shippingAddress.empty" />
          )}
        </View>
        <PaymentButton
          amount={totalPrice}
          onClose={() => {}}
          onSuccess={(data) => {
            console.log(data)
          }}
          publicKey={"ueeuiriur"}
          disabled={!totalPrice}
        />

        {/* <Button
          textStyle={themed($orderButtonText)}
          tx="checkout:proceedToPayment"
          preset="reversed"
          style={themed($orderButton)}
        /> */}
      </View>
    </Screen>
  )
}

const $horizontalScroll: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 10,
  flexDirection: "row",
  padding: spacing.sm,
  borderRadius: spacing.md,
  overflowX: "auto",
})
const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: spacing.xs,
})

const $orderButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.background,
})

const $icon: ThemedStyle<ImageStyle> = ({ spacing, colors }) => ({
  borderRadius: spacing.xl,
  backgroundColor: colors.errorBackground,
  width: 20,
})

const $orderButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  borderRadius: spacing.xl,
  backgroundColor: colors.errorBackground,
  paddingHorizontal: spacing.xxl,
  width: "100%",
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "flex-start",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.lg,
  gap: spacing.sm,
  paddingBottom: spacing.xs,
  flex: 1,
})

const $Checkout: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 300,
  width: 300,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  resizeMode: "contain",
  borderRadius: spacing.xxl,
})

const $priceText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.md,
  fontWeight: "500",
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 20,
  fontWeight: "500",
})
