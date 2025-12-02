import React, { FC, useState } from "react"
import { Modal, Pressable, Text, View, ViewStyle } from "react-native"
import { Icon } from "../../components/Icon"
import { TextField } from "../../components/TextField"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { $styles } from "@/theme/styles"

const ProductSearchModal: FC = (props) => {
  const [visible, setVisible] = useState(false)
  const { themed, theme } = useAppTheme()

  const toggleModal = () => {
    setVisible((prev) => !visible)
  }

  if (!visible)
    return (
      <TextField
        onFocus={toggleModal}
        onBlur={toggleModal}
        placeholderTx={"homeScreen:searchPlaceholder"}
        RightAccessory={() => (
          <Icon
            icon="search"
            style={{ marginVertical: "auto", top: 10, right: 5 }}
            color={theme.colors.text}
          />
        )}
      />
    )
  return (
    <Modal visible={visible}>
      <SafeAreaView style={$styles.flex1}>
        <View style={themed($textFieldWrapper)}>
          <Pressable onPress={toggleModal}>
            <Icon icon="caretLeft" size={30} />
          </Pressable>
          <View style={{ width: "87%" }}>
            <TextField
              onFocus={() => setVisible(true)}
              onBlur={() => setVisible(true)}
              placeholderTx={"homeScreen:searchPlaceholder"}
              RightAccessory={() => (
                <Icon
                  icon="search"
                  style={{ marginVertical: "auto", top: 10, right: 5 }}
                  color={theme.colors.text}
                />
              )}
            />
          </View>
        </View>
        {/* Search modal main content here */}
        <View style={themed($container)}>
          <Text>Your previous search keys are:</Text>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const $textFieldWrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 20,
  width: "100%",
  flexDirection: "row",
  padding: spacing.md,
  justifyContent: "center",
  alignItems: "center",
})

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 2,
  flex: 1,
  width: "100%",
  padding: spacing.sm,
})

export default ProductSearchModal
