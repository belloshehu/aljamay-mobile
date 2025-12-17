import { View, Text, Image, StyleSheet, Pressable } from "react-native"

interface ImagePreviewProps {
  uri?: string
  previewText?: string
  onPress?: () => void
}
export const ImagePreview = (props: ImagePreviewProps) => {
  const { uri, previewText = "Image Preview", onPress } = props
  if (uri)
    return (
      <Pressable style={styles.imageContainer} onPress={onPress}>
        <Image source={{ uri }} style={styles.image} />
        <Text style={styles.previewText}>Tap to replace</Text>
      </Pressable>
    )

  return (
    <Pressable style={styles.empty} onPress={onPress}>
      <Text style={styles.previewText}>{previewText}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
    position: "relative",
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
    fontSize: 16,
    color: "#fff",
    position: "absolute",
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    top: 10,
    color: "#fff",
    zIndex: 10,
  },
})
