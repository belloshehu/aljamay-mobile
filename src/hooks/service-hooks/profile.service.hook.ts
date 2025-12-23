import { useAuth } from "@/context/AuthContext"
import { ProfileServiceAPI } from "@/services/api/profile.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Toast from "react-native-toast-message"

export const useUpdateProfile = () => {
  // Hook to update user profile
  const { setUser } = useAuth()
  return useMutation({
    mutationFn: ProfileServiceAPI.updateProfile,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      })
      setUser(data)
    },
    onError: (error: AxiosError<{ error: string }>) => {
      Toast.show({
        type: "error",
        text1: `Error updating profile: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    },
  })
}
