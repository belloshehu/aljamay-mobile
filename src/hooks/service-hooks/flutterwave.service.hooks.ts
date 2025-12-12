import FlutterwaveServiceAPI from "@/services/api/flutterwave.service"
import { useMutation } from "@tanstack/react-query"
import Toast from "react-native-toast-message"

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: FlutterwaveServiceAPI.verifyPayment,
    onSuccess() {
      //   Toast.show({ type: "success", text2: "Transaction verified" })
    },
    onError: () => {
      Toast.show({ type: "success", text2: "Failed to verify transaction." })
    },
  })
}
