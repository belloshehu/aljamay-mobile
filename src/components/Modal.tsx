// A self-contained modal with trigger and the actual Component rendered when triggered.

import React, { FC } from "react"
import { Button } from "./Button"
import {
  PressableProps,
  Modal as RNModal,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { $styles } from "@/theme/styles"
import { PressableIcon } from "./Icon"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Text } from "./Text"
import useCloseOnBack from "@/hooks/useCloseOnBack"

interface DefaultTriggerComponentProps {
  toggle: () => void
}
const DefaultTriggerComponent: FC<DefaultTriggerComponentProps> = (
  props: DefaultTriggerComponentProps,
) => {
  return <Button tx="modal:triggerButton" onPress={props.toggle} />
}

interface DefaultRenderedModalChildrenProps {
  toggle: () => void
}
const DefaultRenderedModalChildren: FC<DefaultRenderedModalChildrenProps> = (
  props: DefaultRenderedModalChildrenProps,
) => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($textFieldWrapper)}>
      {/* <PressableIcon icon="caretLeft" onPress={props.toggle} style={{ margin: 10 }} size={24} /> */}
      <View style={{ width: "87%" }}>
        <Text>Hello modal</Text>
      </View>
    </View>
  )
}

interface ModalProps {
  TriggerComponent?: FC<PressableProps>
  RenderedModalChildren?: FC<{ onClose: () => void }>
  triggerText?: string
  title?: string
  titleStyle?: StyleProp<TextStyle>
  headerStyle?: StyleProp<ViewStyle>
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  // const [visible, setVisible] = useState(false)
  const [visible, toggleModal] = useCloseOnBack()
  const { themed } = useAppTheme()
  const { TriggerComponent, RenderedModalChildren, title, titleStyle, headerStyle } = props

  if (!visible && TriggerComponent) return <TriggerComponent onPress={toggleModal} />
  else if (!visible) return <DefaultTriggerComponent toggle={toggleModal} />
  else
    return (
      <RNModal
        visible={visible}
        onRequestClose={toggleModal}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={$styles.flex1}>
          <View style={themed([$header, headerStyle])}>
            <PressableIcon
              icon="caretLeft"
              onPress={toggleModal}
              style={{ margin: 10 }}
              size={24}
            />
            <Text style={themed([titleStyle])}>{title ? title : "Title"}</Text>
          </View>
          {RenderedModalChildren ? (
            <RenderedModalChildren onClose={toggleModal} />
          ) : (
            <DefaultRenderedModalChildren toggle={toggleModal} />
          )}
        </SafeAreaView>
      </RNModal>
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

const $header: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  gap: 2,
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
})

export default Modal
