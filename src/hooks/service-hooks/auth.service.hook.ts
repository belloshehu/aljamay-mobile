import { useAuth } from "@/context/AuthContext"
import AuthServiceAPI from "@/services/api/auth.service.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useAxios } from "../use-axios"
import { AxiosError } from "axios"
// import { Toast } from "toastify-react-native"

export const useLogin = () => {
  const { login } = useAuth()

  return useMutation({
    mutationFn: AuthServiceAPI.login,
    onSuccess: (data) => {
      if (data) {
        login(data.data.token, data.data.user)
      }
      if (__DEV__) {
        // console.log("Loged in successfully", data.response)
      }
    },
    onError: (error: any) => {
      // Toast.error(error.response.data)
      if (__DEV__) {
        // console.log("Failed to login:", error.response.data)
      }
    },
  })
}

export const useSignup = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: AuthServiceAPI.signup,
    onSuccess: () => {
      router.push("/(app)/(tabs)/user/(auth)/login")
      if (__DEV__) {
        //console.log("Sign up in successfully", data.response)
      }
    },
    onError: (error: any) => {
      // Toast.error(error.response.data)
      if (__DEV__) {
        // console.log("Failed to signup:", error.response.data)
      }
    },
  })
}

// Handle email verification request
export const useVerifyEmail = () => {
  const router = useRouter()
  const { logout } = useAuth()
  return useMutation({
    mutationFn: AuthServiceAPI.verifyAccount,
    onSuccess: () => {
      logout()
      router.push("/(app)/(tabs)/user/(auth)/login")
      if (__DEV__) {
        //console.log("Verified successfully", data.response)
      }
    },
    onError: (error: any) => {
      // Toast.error(error.response.data)
      if (__DEV__) {
        // console.log("Failed to verify account:", error.response.data)
      }
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
      router.push("/user/password-reset-request-success")
      if (__DEV__) {
        //console.log("Verified successfully", data.response)
      }
    },
    onError: (error: any) => {
      // Toast.error(error.response.data)
      if (__DEV__) {
        // console.log("Failed to verify account:", error.response.data)
      }
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
      logout()
      router.push("/user/password-reset")
      if (__DEV__) {
        //console.log("Verified successfully", data.response)
      }
    },
    onError: (error: any) => {
      // Toast.error(error.response.data)
      if (__DEV__) {
        // console.log("Failed to verify account:", error.response.data)
      }
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
      logout()
      // use should login after successful password reset
      router.push("/user/login")
      if (__DEV__) {
        //console.log("Verified successfully", data.response)
      }
    },
    onError: (error: AxiosError) => {
      // Toast.error(error.response.data)
      if (__DEV__) {
        // console.log("Failed to verify account:", error.response.data)
      }
    },
  })
}
