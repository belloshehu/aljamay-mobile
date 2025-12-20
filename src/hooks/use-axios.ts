import Config from "@/config"
import { useAuth } from "@/context/AuthContext"
import { useOnline } from "@/context/OnlineProvider"
import axios from "axios"
import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"

export const useAxios = () => {
  const { authToken, logout } = useAuth()
  const isOneline = useOnline()
  const router = useRouter()
  const protectedRequest = axios.create({
    baseURL: Config.API_URL,
  })

  const publicRequest = axios.create({ baseURL: Config.API_URL })

  protectedRequest.interceptors.request.use(
    (request) => {
      if (!isOneline) {
        {
          Toast.show({
            type: "error",
            text1: "You have no internet connection!",
            text2: "Check your connection",
            //onPress: () => Toast.hide(),

            // text1Style: {
            //   color: theme.colors.errorBackground,
            // },
          })
        }
        throw new Error("No connection!")
      }
      request.headers["Authorization"] = `Bearer ${authToken}`
      return request
    },
    (error) => {
      Promise.reject(error)
    },
  )

  protectedRequest.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error?.response?.status === 401) {
        // logout when unauthenitcated error occurs
        logout()
        router.push("/user/login")
      }
      return Promise.reject(error)
    },
  )

  return { protectedRequest, publicRequest }
}
