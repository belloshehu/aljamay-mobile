import { Button } from "@/components/Button"
import PhotoUpload from "@/components/PhotoUpload"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { resizeImage } from "@/utils/image"
import { ImagePickerAsset } from "expo-image-picker"
import { useEffect, useState } from "react"
import { Image, View } from "react-native"

export default function AccountPhotoUpdate() {
  const [photo, setPhoto] = useState<ImagePickerAsset | null>(null)
  const { theme } = useAppTheme()

  useEffect(() => {
    if (photo) {
      resizeImage(photo?.uri!, "avatar").then((resizedImage) => {
        // You can update the state or perform further actions with the resized image here
        setPhoto(resizedImage)
      })
    }
  }, [photo])

  return (
    <View style={{ width: "100%", gap: 20 }}>
      <Text preset="subheading">Account photo update?</Text>
      <PhotoUpload withPreview={true} onChange={setPhoto} value={photo!} />
      <Image src={photo?.uri} />

      {photo && (
        <View>
          <Button tx="common:upload" style={{ width: "100%" }} />
          {/* <Button
            tx="common:cancel"
            style={{ width: "100%", marginTop: theme.spacing.lg }}
            textStyle={{ color: theme.colors.error }}
            // preset="filled"
          /> */}
        </View>
      )}
    </View>
  )
}
