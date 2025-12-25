import * as ImageManipulator from "expo-image-manipulator"

export async function resizeImage(uri: string, usage?: "avatar" | "product" | "banner") {
  let width: number = 1024
  if (usage === "avatar") {
    width = 512 // Set width for avatar
  } else if (usage === "product") {
    width = 1024 // Set width for product
  } else if (usage === "banner") {
    width = 512 // Set width for banner
  }
  const result = await ImageManipulator.manipulateAsync(uri, [{ resize: { width } }], {
    compress: 1, // 0–1 (lower = smaller size)
    format: ImageManipulator.SaveFormat.JPEG,
  })
  return result // { uri, width, height, base64? }
}

export const getPublicIdFromUrl = (imageUrl: string) => {
  // Example URL: https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg
  const publicId = imageUrl.split("/").pop()?.split(".")[0]!
  if (!publicId) {
    throw new Error("Invalid image URL")
  }
  return publicId
}
