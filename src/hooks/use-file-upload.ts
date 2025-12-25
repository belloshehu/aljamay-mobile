import { useState } from "react"
import { useDeleteUploadedImage, useImageUpload } from "./service-hooks/image-upload.hook"
import { useAxios } from "./use-axios"
import { CloudinaryImageUploadFile } from "types/cloudinary.types"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"
import { getPublicIdFromUrl } from "@/utils/image"

export default function useFileUpload() {
  const { isPending: isUploading, mutateAsync, data } = useImageUpload()
  const {
    mutateAsync: deleteUpladedImage,
    isPending: isDeleting,
    data: deleteResult,
  } = useDeleteUploadedImage()
  const { protectedRequest } = useAxios()

  const uploadToCloudinary = async (file: CloudinaryImageUploadFile) => {
    // upload a base64 image to cloudinary
    await mutateAsync({ protectedRequest, file })
    return data
  }

  // desroy/delete the image from cloudinary
  const deleteFromCloudinary = async (imageUrl: string) => {
    const publicId = getPublicIdFromUrl(imageUrl)
    await deleteUpladedImage({ protectedRequest, publicId })
    return deleteResult
  }

  const uploadToS3 = async (file: any) => {
    // upload a base64 image to S3 bucket
  }
  return {
    uploadToCloudinary,
    uploadToS3,
    deleteFromCloudinary,
    isDeleting,
    isUploading,
  }
}
