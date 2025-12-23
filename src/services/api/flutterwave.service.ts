import { AxiosInstance } from "axios"
import { FlutterwaveResponse } from "types/flutterwave.types"

class FlutterwaveServiceAPI {
  static async verifyPayment({
    protectedRequest,
    id,
  }: {
    id: string
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.post<{
      success: boolean
      data: FlutterwaveResponse
    }>("/flutterwave/verify", { id })
    return data
  }
}

export default FlutterwaveServiceAPI
