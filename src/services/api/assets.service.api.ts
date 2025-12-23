import { AxiosInstance } from "axios"
import {
  CloudinaryImageUploadFile,
  DestroyResponseType,
  UploadResponseType,
} from "types/cloudinary.types"

export class ImageUploadServiceAPI {
  static async uploadImage({
    file,
    protectedRequest,
  }: {
    file: CloudinaryImageUploadFile
    protectedRequest: AxiosInstance
  }) {
    const formData = new FormData()
    formData.append("file", file as any)
    const { data } = await protectedRequest.post<UploadResponseType>("/image-upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return data.data
  }

  // Delete image by public ID
  static async deleteImage({
    publicId,
    protectedRequest,
  }: {
    publicId: string
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.delete<DestroyResponseType>(`/image-upload/${publicId}`)
    return data.data
  }
}
