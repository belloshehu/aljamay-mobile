import React from "react"
import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { ImagePreview } from "./ImagePreview"

interface PhotoUploadProps {
  customStyle?: object
  setFile: (name: string | any, file: ImagePicker.ImagePickerAsset) => void
  file?: ImagePicker.ImagePickerAsset
  // setFile: (name: string | any, file: string) => void
  // file: string
  name: string
  buttonText?: string
  withPreview?: boolean
}
export default function PhotoUpload(props: PhotoUploadProps) {
  const { customStyle, setFile, name, buttonText } = props
  // Function to pick an image from
  //the device's media library
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera 
                 roll permission to upload images.`,
      )
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        quality: 1,
      })

      if (!result.canceled) {
        // If an image is selected (not cancelled),
        // update the file state variable
        setFile(name, result.assets[0])
      }
    }
  }
  if (props.withPreview && props.file) {
    return <ImagePreview uri={props.file.uri} />
  }
  return (
    <Button onPress={pickImage} style={customStyle} LeftAccessory={() => <Icon icon="camera" />}>
      {buttonText || "Upload Photo"}
    </Button>
  )
}
