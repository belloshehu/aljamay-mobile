import Config from "@/config"
import { useState } from "react"
import sha1 from "sha1"
import { CloudinaryDestroyesponseType, CloudinaryUploadResponseType } from "types/data.types"

export default function useFileUpload() {
  const [isProgressing, setIsProgressing] = useState(false)
  const uploadToCloudinary = async (file: any, upload_preset: string) => {
    // upload a base64 image to cloudinary
    const cloud_name: string = Config.CLOUDINARY.cloudName!
    const data = new FormData()
    console.log("Uploading to Cloudinary:", file, upload_preset, cloud_name)
    data.append("file", file)
    data.append("upload_preset", upload_preset)
    data.append("cloud_name", cloud_name)
    // data.append("unique_filename", true);
    try {
      setIsProgressing(true)
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "post",
        body: data,
      })
      const jsonResponse: CloudinaryUploadResponseType = await response.json()
      setIsProgressing(false)
      return jsonResponse
    } catch (error) {
      throw new Error(
        `Failed to upload image to Cloudinary: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      )
    }
  }

  // desroy/delete the image from cloudinary
  const deleteFromCloudinary = async (publicId: string) => {
    const timestamp = new Date().getTime()
    const rawSignature = `public_id=${publicId}&timestamp=${timestamp}${Config.CLOUDINARY.apiSecret}`
    const signature = sha1(rawSignature)
    const cloud_name = Config.CLOUDINARY.cloudName!
    setIsProgressing(true)
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: publicId,
        api_key: Config.CLOUDINARY.apiKey,
        api_secret: Config.CLOUDINARY.apiSecret,
        // upload_preset: "clothing",
        timestamp,
        signature,
      }),
    })
    const jsonResponse: CloudinaryDestroyesponseType = await response.json()
    setIsProgressing(false)
    return jsonResponse
  }

  const uploadToS3 = async (file: any) => {
    // upload a base64 image to S3 bucket
    console.log(file)
  }
  return {
    uploadToCloudinary,
    uploadToS3,
    deleteFromCloudinary,
    isProgressing,
  }
}
