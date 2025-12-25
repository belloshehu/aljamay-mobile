import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ComponentType, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupSchemaType, signupValidationSchema } from "@/schemas/auth.validation.schema"
import { TextField, TextFieldAccessoryProps } from "@/components/TextField"
import { PressableIcon } from "@/components/Icon"
import { colors } from "@/theme/colors"
import { Button } from "@/components/Button"
import { useSignup } from "@/hooks/service-hooks/auth.service.hook"
import { useAxios } from "@/hooks/use-axios"
import { Checkbox } from "@/components/Toggle/Checkbox"

interface SignupFormProps {
  setError: Dispatch<SetStateAction<string>>
}

const SignupForm: FC<SignupFormProps> = (props: SignupFormProps) => {
  const { setError } = props
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)

  const { mutateAsync, isPending, error: loginError } = useSignup()
  const { publicRequest } = useAxios()

  const { themed } = useAppTheme()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      passwordRepeat: "",
      marketingAccepted: true,
      privacyAccepted: false,
    },
  })

  const onSubmit = (data: SignupSchemaType) => {
    mutateAsync({ payload: data, publicRequest })
  }

  useEffect(() => {
    if (loginError) {
      setError(loginError?.response?.data?.error || "Sign up failed")
    }
  }, [loginError])

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
      {/* First name textinput */}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="given-name"
            autoCorrect={false}
            labelTx="signupScreen:firstNameFieldLabel"
            placeholderTx="signupScreen:firstNameFieldPlaceholder"
            helper={errors.firstName?.message}
            status={errors.firstName ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("lastName")}
          />
        )}
      />

      {/* Last name textinput */}
      <Controller
        control={control}
        name="lastName"
        render={({ field: { ref, onChange, value } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="family-name"
            autoCorrect={false}
            labelTx="signupScreen:lastNameFieldLabel"
            placeholderTx="signupScreen:lastNameFieldPlaceholder"
            helper={errors.lastName?.message}
            status={errors.lastName ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("email")}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            labelTx="loginScreen:emailFieldLabel"
            placeholderTx="loginScreen:emailFieldPlaceholder"
            helper={errors.email?.message}
            status={errors.email ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("password")}
          />
        )}
      />

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
            returnKeyType="next"
            onSubmitEditing={() => setFocus("marketingAccepted")}
          />
        )}
      />

      <View style={themed($checkBoxWrapper)}>
        <Controller
          control={control}
          name="marketingAccepted"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              labelTx="signupScreen:markettingPolicy"
              id="marketting"
              value={value as boolean}
              onValueChange={onChange}
              helper={errors.marketingAccepted?.message}
              status={errors.marketingAccepted ? "error" : undefined}
            />
          )}
        />

        <Controller
          control={control}
          name="privacyAccepted"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              labelTx="signupScreen:privacyPolicy"
              id="privacy"
              value={value as boolean}
              onValueChange={onChange}
              helper={errors.privacyAccepted?.message}
              status={errors.privacyAccepted ? "error" : undefined}
            />
          )}
        />
      </View>

      <Button
        testID="login-button"
        tx={isPending ? "signupScreen:signupProgress" : "signupScreen:tapToSignUp"}
        style={themed($tapButton)}
        preset="reversed"
        onPress={isPending ? undefined : handleSubmit(onSubmit)}
        disabled={isPending}
      />
    </View>
  )
}

const $checkBoxWrapper: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  gap: 10,
  marginBottom: spacing.sm,
})
const $formContainer: ThemedStyle<ViewStyle> = ({}) => ({})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  backgroundColor: colors.errorBackground,
})

export default SignupForm
