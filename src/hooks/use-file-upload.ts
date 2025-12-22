import { useState } from "react"
import { useDeleteUploadedImage, useImageUpload } from "./service-hooks/image-upload.hook"
import { useAxios } from "./use-axios"
import { CloudinaryImageUploadFile } from "types/cloudinary.types"

export default function useFileUpload() {
  const [isProgressing, setIsProgressing] = useState(false)
  const { isPending, mutateAsync, data } = useImageUpload()
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
  const deleteFromCloudinary = async (publicId: string) => {
    await deleteUpladedImage({ protectedRequest, publicId })
    return deleteResult
  }

  const uploadToS3 = async (file: any) => {
    // upload a base64 image to S3 bucket
    console.log(file)
  }
  return {
    uploadToCloudinary,
    uploadToS3,
    deleteFromCloudinary,
    isProgressing: isPending || isDeleting || isProgressing,
  }
}
