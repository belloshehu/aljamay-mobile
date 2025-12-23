import * as ImageManipulator from "expo-image-manipulator"

export async function resizeImage(uri: string, usage?: "avatar" | "product" | "banner") {
  let width: number = 1024
  if (usage === "avatar") {
    width = 256
  } else if (usage === "product") {
    width = 1024
  } else if (usage === "banner") {
    width = 512
  }
  const result = await ImageManipulator.manipulateAsync(uri, [{ resize: { width } }], {
    compress: 0.7, // 0–1 (lower = smaller size)
    format: ImageManipulator.SaveFormat.JPEG,
  })
  return result // { uri, width, height, base64? }
}
