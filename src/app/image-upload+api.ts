import { CloudinaryUploadResponseType } from "types/data.types"

// API rooute for uploading product images to Cloudinary
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { imageFile } = body as any
    if (!imageFile) {
      return new Response(JSON.stringify({ error: "No image data provided" }), { status: 400 })
    }
    const upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET!
    const cloud_name = process.env.CLOUDINARY_CLOUD_NAME!
    const data = new FormData()
    console.log("Uploading to Cloudinary:", imageFile, upload_preset, cloud_name)
    data.append("file", imageFile)
    data.append("upload_preset", upload_preset)
    data.append("cloud_name", cloud_name)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "post",
      body: data,
    })

    const jsonResponse: CloudinaryUploadResponseType = await response.json()
    return new Response(JSON.stringify(jsonResponse), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    )
  }
}

export function GET() {
  return new Response("Image Upload API is running")
}
