import { ImageUploadServiceAPI } from "@/services/api/assets.service.api"
import { useMutation } from "@tanstack/react-query"
import Toast from "react-native-toast-message"

export const useImageUpload = () => {
  return useMutation({
    mutationFn: ImageUploadServiceAPI.uploadImage,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Image uploaded!",
      })
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `Error uploading image: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    },
  })
}

export const useDeleteUploadedImage = () => {
  return useMutation({
    mutationFn: ImageUploadServiceAPI.deleteImage,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Image deleted!",
      })
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `Error deleting image: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    },
  })
}
