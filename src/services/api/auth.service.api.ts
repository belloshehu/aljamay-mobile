import {
  EmailVerificationSchemaType,
  LoginSchemaType,
  SignupSchemaType,
} from "@/schemas/auth.validation.schema"
import { AxiosInstance } from "axios"
import {
  EmailVerificationCodeResponse,
  LoginResponseType,
  RegisterResponseType,
} from "types/auth.types"

class AuthServiceAPI {
  static async login({
    publicRequest,
    payload,
  }: {
    publicRequest: AxiosInstance
    payload: LoginSchemaType
  }) {
    const { data } = await publicRequest.post<LoginResponseType>("/native/login", payload)
    return data
  }

  // Send the login verification token back to server to complete user's login process.
  static async loginVerify({
    protectedRequest,
    token,
  }: {
    protectedRequest: AxiosInstance
    token: string
  }) {
    const { data } = await protectedRequest.post<LoginResponseType>(
      "/native/login-verify?token=" + token,
    )
    return data
  }

  static async signup({
    publicRequest,
    payload,
  }: {
    publicRequest: AxiosInstance
    payload: SignupSchemaType
  }) {
    const { data } = await publicRequest.post<RegisterResponseType>("/native/signup", payload)
    return data
  }

  /* EMAIL VERIFICATION:
   Send the verification token to server to complete email verification process.
  */
  static async verifyEmail({
    protectedRequest,
    token,
  }: {
    protectedRequest: AxiosInstance
    token: string
  }) {
    const { data } = await protectedRequest.post("/native/verify-email?token=" + token)
    return data
  }

  // Send post request with user's email address to get link for email verification
  static async requestEmailVerificationLink({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance
    payload: EmailVerificationSchemaType
  }) {
    const { data } = await protectedRequest.post<EmailVerificationCodeResponse>(
      "/native/send-email-verification-link",
      payload,
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
