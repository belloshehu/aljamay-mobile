import { useAuth } from "@/context/AuthContext"
import AuthServiceAPI from "@/services/api/auth.service.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useAxios } from "../use-axios"
import { AxiosError } from "axios"
import { push } from "expo-router/build/global-state/routing"
import Toast from "react-native-toast-message"
// import { Toast } from "toastify-react-native"

export const useLogin = () => {
  return useMutation({
    mutationFn: AuthServiceAPI.login,
    onSuccess: (data) => {
      Toast.show({ type: "success", text1: "Login success!", text2: data.message })
    },
    onError: (error: any) => {
      Toast.show({
        text1: `Login error: ${error instanceof Error ? error.message : "Unknown error"}`,
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
      Toast.show({ type: "success", text1: "Login successful!" })
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: `Login error: ${error instanceof Error ? error.message : "Unknown error"}`,
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
    onError: (error: any) => {
      Toast.show({ type: "error", text1: "Signup failed!" })
    },
  })
}

// Send the received email verification code to server
export const useVerifyEmail = () => {
  const router = useRouter()
  const { logout } = useAuth()
  return useMutation({
    mutationFn: AuthServiceAPI.verifyAccount,
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Email verified!" })
      logout()
      router.push("/user/login")
    },
    onError: (error: any) => {
      Toast.show({ type: "error", text1: "Email verification failed!" })
    },
  })
}

export const useRequestEmailVerificationCode = (enabled: boolean = false) => {
  const { protectedRequest } = useAxios()
  return useQuery({
    queryFn: async () => AuthServiceAPI.requestVerificationCode({ protectedRequest }),
    queryKey: ["email-verification"],
    enabled,
    refetchOnMount: false,
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
