import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ComponentType, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginValidationSchema, LoginSchemaType } from "@/schemas/auth.validation.schema"
import { TextField, TextFieldAccessoryProps } from "@/components/TextField"
import { PressableIcon } from "@/components/Icon"
import { colors } from "@/theme/colors"
import { Button } from "@/components/Button"
import { useLogin } from "@/hooks/service-hooks/auth.service.hook"
import { useAxios } from "@/hooks/use-axios"
import { Text } from "@/components/Text"
import { useRouter } from "expo-router"
import { GlowWrapper } from "@/components/GlowWrapper"

interface LoginFormProps {
  setError: Dispatch<SetStateAction<string>>
}

const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const { mutateAsync, isPending, error: loginError, data, isSuccess } = useLogin()
  const { publicRequest } = useAxios()
  const router = useRouter()

  const { themed } = useAppTheme()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
    reset,
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginValidationSchema) })

  const onSubmit = (data: LoginSchemaType) => {
    mutateAsync({ payload: data, publicRequest })
      .then(() => {
        props.setError("")
      })
      .then(() => {
        reset()
      })
  }

  useEffect(() => {
    if (loginError) {
      props.setError(loginError?.response?.data?.error || "Login failed")
    }
  }, [loginError])

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style as ViewStyle}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, colors.palette.neutral800],
  )

  return (
    <View style={themed($formContainer)}>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, ref } }) => (
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
            returnKeyType="send"
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
            secureTextEntry={isAuthPasswordHidden}
            labelTx="loginScreen:passwordFieldLabel"
            placeholderTx="loginScreen:passwordFieldPlaceholder"
            helper={errors.password?.message}
            status={errors.password ? "error" : undefined}
            RightAccessory={PasswordRightAccessory}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
      />

      <GlowWrapper style={{ marginTop: 20 }} runGlow={isPending}>
        <Button
          testID="login-button"
          tx={isPending ? "loginScreen:loginProgress" : "loginScreen:tapToLogIn"}
          preset="filled"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </GlowWrapper>
    </View>
  )
}

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.md,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

export default LoginForm
