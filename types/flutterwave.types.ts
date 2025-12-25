import { FlutterwaveInitCustomer } from "flutterwave-react-native/dist/FlutterwaveInit"

export interface FlutterwaveResponse {
  status: string
  message?: string
  amount: number
  currency: "NGN" | "USD"
  tx_ref: string
  flw_ref: string
  transaction_id: string | number
  customer: FlutterwaveInitCustomer
  charged_amount?: number
  app_fee?: number
  processor_response?: string
  payment_type?: string
  created_at?: string
}
