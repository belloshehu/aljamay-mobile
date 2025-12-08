import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AccountVerificationSchemaType,
  accountVerificationValidationSchema,
} from "@/schemas/auth.validation.schema"
import { TextField } from "@/components/TextField"
import { Button } from "@/components/Button"
import { useVerifyAccount } from "@/hooks/service-hooks/auth.service.hook"
import { useAxios } from "@/hooks/use-axios"

interface AccountVerificationFormProps {
  setError: Dispatch<SetStateAction<string>>
}

const AccountVerificationForm: FC<AccountVerificationFormProps> = (
  props: AccountVerificationFormProps,
) => {
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const { mutateAsync, isPending, error: verificationError } = useVerifyAccount()
  const { protectedRequest } = useAxios()

  const { themed } = useAppTheme()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AccountVerificationSchemaType>({
    resolver: zodResolver(accountVerificationValidationSchema),
  })

  const onSubmit = (data: AccountVerificationSchemaType) => {
    mutateAsync({ payload: data, protectedRequest }).then(() => {
      props.setError("")
    })
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
        name="code"
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
            placeholderTx="verification:verificationCodeFieldPlaceholder"
            helper={errors.code?.message}
            status={errors.code ? "error" : undefined}
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmit)}
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

export default AccountVerificationForm
