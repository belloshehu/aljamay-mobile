import { Button } from "@/components/Button"
import { Overlay } from "@/components/Overlay"
import PhotoUpload from "@/components/PhotoUpload"
import { Text } from "@/components/Text"
import { useUpdateProfile } from "@/hooks/service-hooks/profile.service.hook"
import { useAxios } from "@/hooks/use-axios"
import useFileUpload from "@/hooks/use-file-upload"
import { useAppTheme } from "@/theme/context"
import { ImagePickerAsset } from "expo-image-picker"
import { useState } from "react"
import { Image, View } from "react-native"
import { CloudinaryImageUploadFile } from "types/cloudinary.types"

interface AccountPhotoUpdateProps {
  imageUrl?: string
}

export default function AccountPhotoUpdate({ imageUrl }: AccountPhotoUpdateProps) {
  const [photo, setPhoto] = useState<ImagePickerAsset | null>(null)
  const { theme } = useAppTheme()
  const { uploadToCloudinary, deleteFromCloudinary, isUploading, isDeleting } = useFileUpload()
  const { mutateAsync, isPending: isUpdating } = useUpdateProfile()
  const { protectedRequest } = useAxios()

  const handleExistingImageDelete = () => {
    if (imageUrl) {
      deleteFromCloudinary(imageUrl)
    }
  }

  const handleImageUpload = async () => {
    if (photo?.uri) {
      const file: CloudinaryImageUploadFile = {
        uri: photo.uri,
        type: "image/jpeg",
        name: `avatar_${Date.now()}.jpg`,
      }
      const result = await uploadToCloudinary(file) // upload the image
      // Optionally delete the previous image
      if (imageUrl) {
        await deleteFromCloudinary(imageUrl)
      }
      // update user profile with the new image URL here
      if (result && result?.secure_url) {
        mutateAsync({ protectedRequest, payload: { photoUrl: result.secure_url } })
      }
    }
  }

  const renderStatus = () => {
    let message = ""
    if (isUploading) {
      message = "Uploading image ..."
    } else if (isDeleting) {
      message = "Deleting image ..."
    } else if (isUpdating) {
      message = "Updating profile ..."
    }
    return <Text style={{ color: "#fff" }}>{message}</Text>
  }

  return (
    <View style={{ width: "100%", gap: 20 }}>
      <Text preset="subheading">Account photo update?</Text>
      <PhotoUpload withPreview={true} onChange={setPhoto} value={photo!} usage="avatar" />
      <Image src={photo?.uri} />

      {photo && (
        <View>
          <Button
            tx={isUploading ? "common:uploading" : "common:upload"}
            style={{ width: "100%" }}
            onPress={handleImageUpload}
            disabled={isUploading || isUpdating || isDeleting}
          />
        </View>
      )}
      {imageUrl && (
        <Button
          tx={isDeleting ? "common:deleting" : "profileScreen:deleteImage"}
          style={{ width: "100%", marginTop: theme.spacing.lg }}
          textStyle={{ color: theme.colors.error }}
          // preset="filled"
          onPress={handleExistingImageDelete}
          disabled={isUploading || isUpdating || isDeleting}
        />
      )}
      <Overlay visible={isDeleting || isUploading || isUpdating}>{renderStatus()}</Overlay>
    </View>
  )
}
