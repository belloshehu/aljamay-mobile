import { SignupSchemaType } from "@/schemas/auth.validation.schema"
import { AxiosInstance } from "axios"
import { LoginPayload } from "types/auth.types"
class AuthServiceAPI {
  static async login({
    publicRequest,
    payload,
  }: {
    publicRequest: AxiosInstance
    payload: LoginPayload
  }) {
    const { data } = await publicRequest.post("/native/login", payload)
    return data
  }

  static async signup({
    publicRequest,
    payload,
  }: {
    publicRequest: AxiosInstance
    payload: SignupSchemaType
  }) {
    const { data } = await publicRequest.post("/native/signup", payload)
    return data
  }
}

export default AuthServiceAPI
