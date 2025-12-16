import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextField } from "@/components/TextField"
import { Button } from "@/components/Button"
import { Picker } from "@react-native-picker/picker"

import { useAxios } from "@/hooks/use-axios"
import {
  productCreateValidationSchema,
  ProductCreateValidationSchemaType,
} from "@/schemas/product.validation.schema"
import { useCreateProduct } from "@/hooks/service-hooks/product.service.hooks"
import PhotoUpload from "@/components/PhotoUpload"
import { productCategoryOptions } from "@/constants"
import DropdownComponent from "@/components/Dropdown"
import { Text } from "@/components/Text"

interface ProductFormProps {
  setError?: Dispatch<SetStateAction<string>>
}

const ProductForm: FC<ProductFormProps> = (props: ProductFormProps) => {
  const { setError } = props
  const { mutateAsync, isPending, error } = useCreateProduct()
  const { protectedRequest } = useAxios()

  const { themed } = useAppTheme()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(productCreateValidationSchema),
    defaultValues: {},
  })

  const onSubmit = (data: ProductCreateValidationSchemaType) => {
    console.log(data)
    mutateAsync({ payload: data, protectedRequest })
  }

  useEffect(() => {
    if (error && setError) {
      setError(error?.response?.data?.error || "Failed to Add address")
    }
  }, [error])

  console.log(getValues())
  console.log(watch())

  return (
    <View style={themed($formContainer)}>
      {/* First name textinput */}
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoComplete="given-name"
            autoCorrect={false}
            labelTx="productForm:nameLabel"
            placeholderTx="productForm:namePlaceholder"
            helper={errors.name?.message}
            status={errors.name ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("price")}
          />
        )}
      />

      {/* Last name textinput */}
      <Controller
        control={control}
        name="price"
        render={({ field: { ref, onChange, value } }) => (
          <TextField
            value={value as string}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            keyboardType="numeric"
            autoCorrect={false}
            labelTx="productForm:priceLabel"
            placeholderTx="productForm:pricePlaceholder"
            helper={errors.price?.message}
            status={errors.price ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("discount")}
          />
        )}
      />

      {/* Product discount */}
      <Controller
        control={control}
        name="discount"
        render={({ field: { ref, onChange, value } }) => (
          <TextField
            value={value as string}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            keyboardType="numeric"
            autoCorrect={false}
            labelTx="productForm:discountLabel"
            placeholderTx="productForm:discountPlaceholder"
            helper={errors.discount?.message}
            status={errors.discount ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("category")}
          />
        )}
      />

      {/* Product category */}
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value, ref } }) => (
          // <Picker selectedValue={value} onValueChange={onChange}>
          //   {productCategoryOptions.map((category) => (
          //     <Picker.Item {...category} key={category.value} />
          //   ))}
          // </Picker>
          <DropdownComponent data={productCategoryOptions} setValue={onChange} value={value} />
        )}
      />

      {/* Product quantity */}
      <Controller
        control={control}
        name="quantity"
        render={({ field: { value, onChange, ref } }) => (
          <TextField
            value={value as string}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            labelTx="productForm:quantityLabel"
            placeholderTx="productForm:quantityPlaceholder"
            helper={errors.quantity?.message}
            status={errors.quantity ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("image")}
          />
        )}
      />

      {/* Product  decription  */}
      <Controller
        control={control}
        name="description"
        render={({ field: { ref, onChange, value } }) => (
          <TextField
            value={value as string}
            onChangeText={onChange}
            ref={ref}
            containerStyle={themed($textField)}
            autoCapitalize="none"
            autoCorrect={false}
            labelTx="productForm:descriptionLabel"
            placeholderTx="productForm:descriptionPlaceholder"
            helper={errors.description?.message}
            status={errors.description ? "error" : undefined}
            returnKeyType="next"
            onSubmitEditing={() => setFocus("discount")}
            multiline
          />
        )}
      />

      <Controller
        control={control}
        name="image"
        render={({ field: { name, value }, fieldState: { error } }) => (
          <View>
            <PhotoUpload
              name={name}
              setFile={setValue}
              file={value}
              buttonText="Upload product image"
              withPreview
            />
            {error && <Text text={error.message} style={{ color: "red" }} />}
          </View>
        )}
      />

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

const $formContainer: ThemedStyle<ViewStyle> = ({}) => ({})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.lg,
  backgroundColor: colors.errorBackground,
})

export default ProductForm
