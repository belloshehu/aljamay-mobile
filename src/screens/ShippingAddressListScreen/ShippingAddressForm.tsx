import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ComponentType, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextField, TextFieldAccessoryProps } from "@/components/TextField"
import { Button } from "@/components/Button"

import { useAxios } from "@/hooks/use-axios"
import { Checkbox } from "@/components/Toggle/Checkbox"
import {
  shippingAddressValidationSchema,
  ShippingAddressValidationSchemaType,
} from "@/schemas/shipping-address.validation.schemas"
import { useCreateShippingAddress } from "@/hooks/service-hooks/shipping.service.hooks"

interface ShippingAddressFormProps {
  setError?: Dispatch<SetStateAction<string>>
}

const ShippingAddressForm: FC<ShippingAddressFormProps> = (props: ShippingAddressFormProps) => {
  const { setError } = props
  const { mutateAsync, isPending, error } = useCreateShippingAddress()
  const { protectedRequest } = useAxios()

  const { themed } = useAppTheme()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm({
    resolver: zodResolver(shippingAddressValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      isActive: true,
      isDefault: true,
      phoneNumber: "",
      postalCode: "",
      state: "",
      streetAddress: "",
    },
  })

  const onSubmit = (data: ShippingAddressValidationSchemaType) => {
    mutateAsync({ payload: data, protectedRequest })
  }

  useEffect(() => {
    if (error && setError) {
      setError(error?.response?.data?.error || "Failed to Add address")
    }
  }, [error])

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
            labelTx="profileScreen:shipping.address.form.firstNameFieldLabel"
            placeholderTx="profileScreen:shipping.address.form.firstNameFieldPlaceholder"
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
            labelTx="profileScreen:shipping.address.form.lastNameFieldLabel"
            placeholderTx="profileScreen:shipping.address.form.lastNameFieldPlaceholder"
            helper={errors.lastName?.message}
            status={errors.lastName ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("phoneNumber")}
          />
        )}
      />

      {/* User's phone number */}
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { ref, onChange, value } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="tel"
            autoCorrect={false}
            labelTx="profileScreen:shipping.address.form.phoneNumberFieldLabel"
            placeholderTx="profileScreen:shipping.address.form.phoneNumberFieldPlaceholder"
            helper={errors.phoneNumber?.message}
            status={errors.phoneNumber ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("streetAddress")}
          />
        )}
      />

      <Controller
        control={control}
        name="streetAddress"
        render={({ field: { onChange, value, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="street-address"
            autoCorrect={false}
            keyboardType="default"
            labelTx="profileScreen:shipping.address.form.streetAddressLabel"
            placeholderTx="profileScreen:shipping.address.form.streetAddressFieldPlaceholder"
            helper={errors.streetAddress?.message}
            status={errors.streetAddress ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("city")}
            multiline
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="postal-address-locality"
            autoCorrect={false}
            labelTx="profileScreen:shipping.address.form.cityLabel"
            placeholderTx="profileScreen:shipping.address.form.cityFieldPlaceholder"
            helper={errors.city?.message}
            status={errors.city ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("state")}
          />
        )}
      />

      <Controller
        control={control}
        name="state"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="postal-address-region"
            autoCorrect={false}
            labelTx="profileScreen:shipping.address.form.stateLabel"
            placeholderTx="profileScreen:shipping.address.form.stateFieldPlaceholder"
            helper={errors.state?.message}
            status={errors.state ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("country")}
          />
        )}
      />

      <Controller
        control={control}
        name="country"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="postal-address-country"
            autoCorrect={false}
            labelTx="profileScreen:shipping.address.form.countryLabel"
            placeholderTx="profileScreen:shipping.address.form.countryFieldPlaceholder"
            helper={errors.country?.message}
            status={errors.country ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("postalCode")}
          />
        )}
      />

      <Controller
        control={control}
        name="postalCode"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="postal-code"
            autoCorrect={false}
            labelTx="profileScreen:shipping.address.form.postalCodeLabel"
            placeholderTx="profileScreen:shipping.address.form.postalCodeFieldPlaceholder"
            helper={errors.postalCode?.message}
            status={errors.postalCode ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("isDefault")}
          />
        )}
      />

      <View style={themed($checkBoxWrapper)}>
        <Controller
          control={control}
          name="isDefault"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              labelTx="profileScreen:shipping.address.form.isDefaultLabel"
              id="marketting"
              value={value as boolean}
              onValueChange={onChange}
              helper={errors.isDefault?.message}
              status={errors.isDefault ? "error" : undefined}
            />
          )}
        />

        <Controller
          control={control}
          name="isActive"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              labelTx="profileScreen:shipping.address.form.isActiveLabel"
              id="privacy"
              value={value as boolean}
              onValueChange={onChange}
              helper={errors.isActive?.message}
              status={errors.isActive ? "error" : undefined}
            />
          )}
        />
      </View>

      <Button
        testID="login-button"
        tx={isPending ? "progress:wait" : "common:submit"}
        style={themed($tapButton)}
        preset="reversed"
        onPress={isPending ? undefined : handleSubmit(onSubmit)}
        disabled={isPending}
      />
    </View>
  )
}

const $checkBoxWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
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

export default ShippingAddressForm
