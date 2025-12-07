import { useAuth } from "@/context/AuthContext"
import AuthServiceAPI from "@/services/api/auth.service.api"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
// import { Toast } from "toastify-react-native"

export const useLogin = () => {
  const { setAuthToken, authToken } = useAuth()

  return useMutation({
    mutationFn: AuthServiceAPI.login,
    onSuccess: (data) => {
      if (data) {
        setAuthToken(data.token)
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
