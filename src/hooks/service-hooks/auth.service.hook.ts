import { useAuth } from "@/context/AuthContext"
import AuthServiceAPI from "@/services/api/auth.service.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useAxios } from "../use-axios"
import { AxiosError } from "axios"
import { push } from "expo-router/build/global-state/routing"
import Toast from "react-native-toast-message"

export const useLogin = () => {
  const { login } = useAuth()
  return useMutation({
    mutationFn: AuthServiceAPI.login,
    onSuccess: (data) => {
      Toast.show({ type: "success", text1: data.message })
      if (data) {
        login(data.data.token, data.data.user)
      }
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        text1: `Login error: ${error instanceof Error ? error.response?.data.error : "Unknown error"}`,
      })
    },
  })
}

export const useLoginVerify = () => {
  const { login } = useAuth()
  return useMutation({
    mutationFn: AuthServiceAPI.loginVerify,
    onSuccess: (data) => {
      if (data) {
        login(data.data.token, data.data.user)
      }
      Toast.show({ type: "success", text1: data.message || "Login success" })
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Login error: ${error instanceof Error ? error.response?.data.error : "Unknown error"}`,
      })
    },
  })
}

export const useSignup = () => {
  return useMutation({
    mutationFn: AuthServiceAPI.signup,
    onSuccess: (data) => {
      Toast.show({ type: "success", text1: "Signup successful!" })
      push("/user/login")
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Signup error: ${error instanceof Error ? error.response?.data.error : "Unknown error"}`,
      })
    },
  })
}

// Send the received email verification token back to server to complete verification.
export const useVerifyEmail = () => {
  const { logout } = useAuth()
  return useMutation({
    mutationFn: AuthServiceAPI.verifyEmail,
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Email verified!" })
      logout()
      push("/user/email-verify-success" as any)
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Verification error: ${error instanceof Error ? error.response?.data.error : "Unknown error"}`,
      })
      push("/user/email-verify-request" as any)
    },
  })
}

// Hook to used to send post request with the user's email in the body to get email verification link
export const useRequestEmailVerificationLink = (enabled: boolean = false) => {
  const { protectedRequest } = useAxios()
  return useMutation({
    mutationFn: AuthServiceAPI.requestEmailVerificationLink,
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Email verification link sent" })
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Email Verification error: ${error instanceof Error ? error.response?.data.error : "Unknown error"}`,
      })
    },
  })
}

/* PASSWORD RESET HOOKS: */

// Get verification code
export const usePasswordResetRequest = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: AuthServiceAPI.requestPasswordReset,
    onSuccess: () => {
      Toast.show({ type: "error", text1: "Password reset request success" })
      router.push("/user/password-reset-request-success")
    },
    onError: (error: any) => {
      Toast.show({ type: "error", text1: "Failed to initiate password reset!" })
    },
  })
}

// Confirm verification code recieved via email and sent it back to the server
export const usePasswordResetVerification = () => {
  const router = useRouter()
  const { logout } = useAuth()
  return useMutation({
    mutationFn: AuthServiceAPI.verifyPasswordReset,
    onSuccess: () => {
      Toast.show({ type: "error", text1: "Password reset code verified" })
      logout()
      router.push("/user/password-reset")
      if (__DEV__) {
        //console.log("Verified successfully", data.response)
      }
    },
    onError: (error: any) => {
      Toast.show({ type: "error", text1: "Failed to verify reset password code!" })
    },
  })
}

// Set the new user password
export const usePasswordReset = () => {
  const router = useRouter()
  const { logout } = useAuth()
  return useMutation({
    mutationFn: AuthServiceAPI.passwordReset,
    onSuccess: () => {
      Toast.show({ type: "success", text1: "New password set!" })
      logout()
      // use should login after successful password reset
      router.push("/user/login")
    },
    onError: (error: AxiosError) => {
      Toast.show({ type: "error", text1: "Failed to set new password!" })
    },
  })
}
