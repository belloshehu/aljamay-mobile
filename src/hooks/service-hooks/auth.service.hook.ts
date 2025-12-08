import { useAuth } from "@/context/AuthContext"
import AuthServiceAPI from "@/services/api/auth.service.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useAxios } from "../use-axios"
// import { Toast } from "toastify-react-native"

export const useLogin = () => {
  const { setAuthToken, authToken, login } = useAuth()

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

// Handle account verification request
export const useVerifyAccount = () => {
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

export const useRequestVerificationCode = (enabled: boolean = false) => {
  const { protectedRequest } = useAxios()
  return useQuery({
    queryFn: async () => AuthServiceAPI.requestVerificationCode({ protectedRequest }),
    queryKey: ["verification"],
    enabled,
    refetchOnMount: false,
  })
}
