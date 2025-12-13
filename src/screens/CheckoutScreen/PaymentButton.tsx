import { PayWithFlutterwave } from "flutterwave-react-native"
import { Button } from "@/components/Button"
import { useAppTheme } from "@/theme/context"
import { FC } from "react"
import { UserType } from "types/auth.types"
import Config from "@/config"
import { TextStyle, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme/types"
import { replace } from "expo-router/build/global-state/routing"
import Toast from "react-native-toast-message"
import { CustomButtonProps } from "flutterwave-react-native/dist/PaywithFlutterwaveBase"
import { RedirectParams } from "flutterwave-react-native/dist/PayWithFlutterwave"
import { useVerifyPayment } from "@/hooks/service-hooks/flutterwave.service.hooks"
import { useAxios } from "@/hooks/use-axios"
import { useCreateOrder } from "@/hooks/service-hooks/order.service.hooks"
import { CartItemType } from "types/cart.types"
import { ShippingAddressType } from "types/shipping.types"

// or import PayWithFlutterwave from 'flutterwave-react-native';

interface PaymentButtonProps {
  totalAmount: number
  cartItems: CartItemType[]
  shippingAddress: ShippingAddressType

  onClose: () => void
  disabled: boolean
  user: UserType
}

export const PaymentButton: FC<PaymentButtonProps> = (props: PaymentButtonProps) => {
  const { themed } = useAppTheme()
  const { mutateAsync: verifyPayment, isPending: isVerifying } = useVerifyPayment()
  const { protectedRequest } = useAxios()
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { totalAmount, cartItems, shippingAddress, onClose, disabled = false } = props
  /* An example function to generate a random transaction reference */
  const generateTransactionRef = (length: number) => {
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return `flw_tx_ref_${result}`
  }

  return (
    <PayWithFlutterwave
      onRedirect={async ({ status, transaction_id }: RedirectParams) => {
        if (status === "cancelled" || !transaction_id) {
          replace("/shopping")
        } else {
          // process the order
          // Handle successful payment
          Toast.show({ type: "success", text2: "Payment successful" })
          // Verify payment:
          const { success, data: verificationData } = await verifyPayment({
            id: transaction_id,
            protectedRequest,
          })

          if (!success) return

          // Create the order if payment verification is successful
          createOrder({
            cartItems: cartItems?.map((item) => item.id)!,
            shippingAddressId: shippingAddress?.id!,
            paymentMethod: "flutterwave",
            totalAmount, // Assuming shipping cost is 0
            protectedRequest,
          })
        }
      }}
      onAbort={() => {
        console.log("Payment aborted:")
      }}
      options={{
        amount: totalAmount,
        currency: "NGN",
        authorization: Config.FLUTTERWAVE_PUBLIC_KEY!, // Use authorizationToken instead of publicKey
        tx_ref: generateTransactionRef(10), // Generate a random transaction reference
        payment_options: "card,mobilemoney,ussd", // or 'banktransfer', 'mobilemoneyghana', etc.
        customer: {
          email: "bello@gmail.com",
          name: "Aliyu" + " " + "Musa",
        },
        customizations: {
          title: "Aljamay",
          description: "Payment for your order.",
          logo: Config.APP_REMOTE_LOGO,
        },
      }}
      customButton={(props: CustomButtonProps) => (
        <Button
          textStyle={themed($orderButtonText)}
          tx="checkout:proceedToPayment"
          preset="reversed"
          style={themed($orderButton)}
          onPress={() => {
            props.onPress()
          }}
          //   loading={props.isInitializing}
          // disabled={props.disabled || disabled}
        />
      )}
    />
  )
}

const $orderButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.background,
})

const $orderButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  borderRadius: spacing.xl,
  backgroundColor: colors.errorBackground,
  paddingHorizontal: spacing.xxl,
  width: "100%",
})
