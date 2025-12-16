import { View, Text, Image, StyleSheet } from "react-native"
import { Button } from "./Button"
import { PressableIcon } from "./Icon"
import { useAppTheme } from "@/theme/context"

interface ImagePreviewProps {
  uri?: string
  previewText?: string
}
export const ImagePreview = (props: ImagePreviewProps) => {
  const { themed } = useAppTheme()
  const { uri, previewText = "Image Preview" } = props
  if (uri)
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
        <PressableIcon icon="camera" style={styles.button} onPress={() => {}} />
      </View>
    )

  return (
    <View style={styles.empty}>
      <Text style={styles.previewText}>{previewText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
  empty: {
    minWidth: "100%",
    minHeight: 180,
    backgroundColor: "#ddd",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  previewText: {
    fontSize: 20,
    color: "#fff",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  button: {
    position: "absolute",
    top: 50,
    color: "#fff",
  },
})
