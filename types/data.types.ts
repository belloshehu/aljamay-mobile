export interface NoDataOptions {
  title: string
  message: string
  className?: string
}

export interface SelectDataType {
  value: string
  label: string
}

export interface NoDataOptions {
  title: string
  message: string
  className?: string
}

export interface SelectDataType {
  value: string
  label: string
}

export interface CloudinaryUploadResponseType {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: "jpg" | "png" | "webp" | "gif"
  resource_type: "image"
  created_at: string
  tags: string[]
  pages: number
  bytes: number
  type: "upload"
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  asset_folder: string
  display_name: string
}

export interface CloudinaryDestroyesponseType {
  result: "ok"
}
