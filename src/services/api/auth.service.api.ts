import { SignupSchemaType } from "@/schemas/auth.validation.schema"
import { AxiosInstance } from "axios"
import { EmailVerificationCodeResponse, LoginPayload, LoginResponseType } from "types/auth.types"

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

  /* EMAIL VERIFICATION: */
  static async verifyAccount({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance
    payload: { code: string }
  }) {
    const { data } = await protectedRequest.post("/native/protected/verify-code", payload)
    return data
  }

  static async requestVerificationCode({ protectedRequest }: { protectedRequest: AxiosInstance }) {
    const { data } = await protectedRequest.get<EmailVerificationCodeResponse>(
      "/native/protected/send-code",
    )
    return data
  }

  /* PASS RESET: */

  // Send request for password request with a registered email:
  static async requestPasswordReset({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance
    payload: { email: string }
  }) {
    const { data } = await protectedRequest.post<EmailVerificationCodeResponse>(
      "/native/password-reset/send-reset-link",
      payload,
    )
    return data
  }

  // Verify the code received via email before proceeding to enter new password:
  static async verifyPasswordReset({ protectedRequest }: { protectedRequest: AxiosInstance }) {
    const { data } = await protectedRequest.get<EmailVerificationCodeResponse>(
      "/native/password-reset/verify-password-reset",
    )
    return data
  }

  // Send post request to set new password for the user:
  static async passwordReset({
    protectedRequest,
    payload,
    token,
  }: {
    protectedRequest: AxiosInstance
    payload: { password: string; passwordRepeat: string }
    token: string
  }) {
    const { data } = await protectedRequest.post<EmailVerificationCodeResponse>(
      "/native/password-reset/reset?token=" + token,
      payload,
    )
    return data
  }
}

export default AuthServiceAPI
