// A self-contained modal with trigger and the actual Component rendered when triggered.

import React, { FC, JSX, ReactNode, useState } from "react"
import { Button } from "./Button"
import {
  Pressable,
  PressableProps,
  Modal as RNModal,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { $styles } from "@/theme/styles"
import { Icon, PressableIcon } from "./Icon"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Text } from "./Text"

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
      <PressableIcon icon="caretLeft" onPress={props.toggle} style={{ margin: 10 }} size={24} />
      <View style={{ width: "87%" }}>Hello modal</View>
    </View>
  )
}

interface ModalProps {
  TriggerComponent?: FC<PressableProps>
  renderedModalChildren?: ReactNode
  triggerText?: string
  title?: string
  titleStyle?: StyleProp<TextStyle>
  headerStyle?: StyleProp<ViewStyle>
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const [visible, setVisible] = useState(false)
  const { themed } = useAppTheme()
  const { TriggerComponent, renderedModalChildren, title, titleStyle, headerStyle } = props

  const toggleModal = () => {
    setVisible((prev) => !prev)
  }
  if (!visible && TriggerComponent) return <TriggerComponent onPress={toggleModal} />
  else if (!visible) return <DefaultTriggerComponent toggle={toggleModal} />
  else
    return (
      <RNModal visible={visible}>
        <SafeAreaView style={$styles.flex1}>
          {renderedModalChildren ? (
            <React.Fragment>
              <View style={themed([$header, headerStyle])}>
                <PressableIcon
                  icon="caretLeft"
                  onPress={toggleModal}
                  style={{ margin: 10 }}
                  size={24}
                />
                <Text style={themed([titleStyle])}>{title && title}</Text>
              </View>

              {renderedModalChildren}
            </React.Fragment>
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
