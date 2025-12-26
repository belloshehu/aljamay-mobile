import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextField } from "@/components/TextField"
import { Button } from "@/components/Button"
import { useRequestEmailVerificationLink } from "@/hooks/service-hooks/auth.service.hook"
import { useAxios } from "@/hooks/use-axios"
import { useTimer } from "@/hooks/useTimer"
import {
  EmailVerificationSchemaType,
  emailVerificationValidationSchema,
} from "@/schemas/auth.validation.schema"
import Config from "@/config"
import { push } from "expo-router/build/global-state/routing"

interface EmailVerificationRequestFormProps {
  setError: Dispatch<SetStateAction<string>>
}

const EmailVerificationRequestForm: FC<EmailVerificationRequestFormProps> = (
  props: EmailVerificationRequestFormProps,
) => {
  const {
    mutateAsync,
    isPending,
    error: verificationError,
    isSuccess,
  } = useRequestEmailVerificationLink()
  const { protectedRequest } = useAxios()
  const [start, setStart] = useState(false)
  const { getTimer } = useTimer({ duration: Config.CODE_RESEND_TIME, start })
  const { themed } = useAppTheme()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<EmailVerificationSchemaType>({
    resolver: zodResolver(emailVerificationValidationSchema),
  })

  const onSubmit = async (data: EmailVerificationSchemaType) => {
    await mutateAsync({ payload: data, protectedRequest })
      .then(() => {
        props.setError("")
      })
      .then(() => {
        setStart(true)
      })
    reset()
  }

  useEffect(() => {
    if (verificationError || errors.root) {
      props.setError(
        verificationError?.response?.data?.error || errors.root?.message || "Verification failed",
      )
    }
  }, [verificationError, errors.root])

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
            placeholderTx="loginScreen:emailFieldPlaceholder"
            helper={errors.email?.message}
            status={errors.email ? "error" : undefined}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
      />

      <Button
        testID="verifcation-button"
        tx={
          isPending
            ? "common:wait"
            : isSuccess
              ? "emailVerificationScreen:resendInFuture"
              : "common:submit"
        }
        style={themed($tapButton)}
        preset="reversed"
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        txOptions={{
          time: getTimer(),
        }}
      />
      <Button
        tx={"common:cancel"}
        onPress={() => push("/user/login")}
        disabled={isPending}
        textStyle={{ color: "#000" }}
        style={{ marginVertical: 30 }}
      />
    </View>
  )
}

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  backgroundColor: colors.errorBackground,
})

export default EmailVerificationRequestForm
