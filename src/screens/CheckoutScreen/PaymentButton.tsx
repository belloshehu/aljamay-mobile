import { PayWithFlutterwaveV2 } from "flutterwave-react-native"
import { Text, TouchableOpacity } from "react-native"
// or import PayWithFlutterwave from 'flutterwave-react-native';

interface PaymentButtonProps {
  amount: number
  currency: "NGN"
  publicKey: string
  onSuccess: boolean
  onClose: () => void
  disabled: boolean
}

export const PaymentButton: FC<PaymentButtonProps> = (props: PaymentButtonProps) => {
  const { amount, currency = "NGN", publicKey, onSuccess, onClose, disabled = false } = props
  /* An example function to generate a random transaction reference */
  const generateTransactionRef = (length) => {
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return `flw_tx_ref_${result}`
  }

  return (
    <PayWithFlutterwaveV2
      onRedirect={(data) => {
        console.log("Redirect data:", data)
      }}
      options={{
        amount: amount,
        currency: currency,
        PBFPubKey: "FLWPUBK_TEST-3bd930dc1147d916c39fc65ce2cfd73c-X", // Use authorizationToken instead of publicKey
        txref: generateTransactionRef(10), // Generate a random transaction reference
        payment_options: "card", // or 'banktransfer', 'mobilemoneyghana', etc.
        customer_email: "bello@gmail.com",
        customer_firstname: "Bello",
      }}
      customButton={(props) => (
        <Button
          // style={styles.paymentButton}
          onPress={props.onPress}
          loading={props.isInitializing}
          disabled={props.disabled || disabled}
          mode="contained"
        >
          Pay {amount}
        </Button>
      )}
    />
  )
}
