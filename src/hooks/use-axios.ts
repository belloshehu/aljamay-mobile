import Config from "@/config"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"
import { useRouter } from "expo-router"

export const useAxios = () => {
  const { authToken, logout } = useAuth()
  const router = useRouter()
  const protectedRequest = axios.create({
    baseURL: Config.API_URL,
  })
  const publicRequest = axios.create({ baseURL: Config.API_URL })

  protectedRequest.interceptors.request.use(
    (request) => {
      request.headers["Authorization"] = `Bearer ${authToken}`
      // request.headers['Content-Type'] = 'Application/json'
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
