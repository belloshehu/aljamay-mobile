import { SignupSchemaType } from "@/schemas/auth.validation.schema"
import { AxiosInstance } from "axios"
import { LoginPayload, LoginResponseType } from "types/auth.types"
class AuthServiceAPI {
  static async login({
    publicRequest,
    payload,
  }: {
    publicRequest: AxiosInstance
    payload: LoginPayload
  }) {
    const { data } = await publicRequest.post<LoginResponseType>("/native/login", payload)
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

  static async verifyAccount({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance
    payload: { code: string }
  }) {
    const { data } = await protectedRequest.post("/protected/verify-code", payload)
    return data
  }

  static async requestVerificationCode({ protectedRequest }: { protectedRequest: AxiosInstance }) {
    const { data } = await protectedRequest.get("/protected/send-code")
    return data
  }
}

export default AuthServiceAPI
