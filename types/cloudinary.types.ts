import { CloudinaryDestroyesponseType, CloudinaryUploadResponseType } from "./data.types"
import { ResponseType } from "./response.types"

export interface CloudinaryImageUploadFile {
  uri: string
  type: "image/jpeg" | "image/png"
  name: string
}

export interface UploadResponseType extends ResponseType<CloudinaryUploadResponseType> {
  data: CloudinaryUploadResponseType
}

export interface DestroyResponseType extends ResponseType<CloudinaryDestroyesponseType> {
  data: CloudinaryDestroyesponseType
}
