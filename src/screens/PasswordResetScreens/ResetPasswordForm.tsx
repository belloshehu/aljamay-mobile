import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ComponentType, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ResetPasswordSchemaType,
  resetPasswordValidationSchema,
} from "@/schemas/auth.validation.schema"
import { TextField, TextFieldAccessoryProps } from "@/components/TextField"
import { Button } from "@/components/Button"
import { usePasswordReset } from "@/hooks/service-hooks/auth.service.hook"
import { useAxios } from "@/hooks/use-axios"
import { PressableIcon } from "@/components/Icon"
import { colors } from "@/theme/colors"

interface ResetPasswordFormProps {
  setError: Dispatch<SetStateAction<string>>
  token: string
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = (props: ResetPasswordFormProps) => {
  const { mutateAsync, isPending, error: verificationError } = usePasswordReset()
  const { protectedRequest } = useAxios()
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)
  const { setError, token } = props

  const { themed } = useAppTheme()
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordValidationSchema),
  })

  const onSubmit = (data: ResetPasswordSchemaType) => {
    mutateAsync({ payload: data, protectedRequest, token }).then(() => {
      setError("")
    })
  }

  useEffect(() => {
    if (verificationError || errors.root) {
      props.setError(
        verificationError?.response?.data?.error! || errors.root?.message || "Verification failed",
      )
    }
  }, [verificationError, errors.root])

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style as ViewStyle}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )
      },
    [isPasswordHidden, colors.palette.neutral800],
  )

  const ConfirmPasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isConfirmPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style as ViewStyle}
            size={20}
            onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
          />
        )
      },
    [isConfirmPasswordHidden, colors.palette.neutral800],
  )
  return (
    <View style={themed($formContainer)}>
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isPasswordHidden}
            labelTx="signupScreen:passwordFieldLabel"
            placeholderTx="signupScreen:passwordFieldPlaceholder"
            helper={errors.password?.message}
            status={errors.password ? "error" : undefined}
            RightAccessory={PasswordRightAccessory}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("passwordRepeat")}
          />
        )}
      />

      <Controller
        control={control}
        name="passwordRepeat"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isConfirmPasswordHidden}
            labelTx="signupScreen:confirmPasswordFieldLabel"
            placeholderTx="signupScreen:confirmPasswordFieldPlaceholder"
            helper={errors.passwordRepeat?.message}
            status={errors.passwordRepeat ? "error" : undefined}
            RightAccessory={ConfirmPasswordRightAccessory}
            returnKeyType="done"
          />
        )}
      />

      <Button
        testID="verifcation-button"
        tx={isPending ? "loginScreen:loginProgress" : "verification:sendVerificationCode"}
        style={themed($tapButton)}
        preset="reversed"
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      />
    </View>
  )
}

const $formContainer: ThemedStyle<ViewStyle> = ({}) => ({})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  backgroundColor: colors.errorBackground,
})

export default ResetPasswordForm
