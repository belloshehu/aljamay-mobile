import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextField } from "@/components/TextField"
import { Button } from "@/components/Button"
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
import Toast from "react-native-toast-message"
import useFileUpload from "@/hooks/use-file-upload"

interface ProductFormProps {
  setError?: Dispatch<SetStateAction<string>>
  onClose?: () => void
}

const ProductForm: FC<ProductFormProps> = (props: ProductFormProps) => {
  const { setError, onClose } = props
  const { mutateAsync, isPending, error } = useCreateProduct()
  const { protectedRequest } = useAxios()
  const { uploadToCloudinary } = useFileUpload()

  const { themed } = useAppTheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productCreateValidationSchema),
    defaultValues: {},
  })

  const onSubmit = async (data: ProductCreateValidationSchemaType) => {
    // Handle form submission logic here
    // upload the image and thumbnails to cloudinary
    console.log("Submitting data: ", data)
    const image = data.image

    try {
      const file = {
        uri: data.image.uri,
        type: data.image.mimeType || "image/jpeg",
        name: data.image.fileName || `product_image_${Date.now()}.jpg`,
      }
      const { secure_url } = await uploadToCloudinary(file, "aljamay-products")

      if (!secure_url) {
        Toast.show({
          type: "error",
          text1: "Failed to upload images",
        })
        return
      }

      // upload the images to cloudinary
      const thumbnails = []
      if (data?.thumbnails) {
        console.log("uploading thumbnails", data.thumbnails)
        for (let i = 0; i < data?.thumbnails?.length!; i++) {
          const image = data.thumbnails[i]
          const file = {
            uri: data.image.uri,
            type: data.image.mimeType || "image/jpeg",
            name: data.image.fileName || `product_image_${Date.now()}.jpg`,
          }
          const { secure_url } = await uploadToCloudinary(file, "aljamay-products")
          thumbnails.push(secure_url)
        }
        if (thumbnails.length === 0) {
          Toast.show({
            type: "error",
            text1: "Failed to upload thumbnails",
          })
        }
      }

      // create product instance in the database

      mutateAsync({
        payload: {
          name: data.name,
          price: data.price,
          discount: data.discount,
          category: data.category,
          quantity: data.quantity,
          description: data.description,
          image: secure_url as any,
          thumbnails: thumbnails,
        },
        protectedRequest,
      })
      reset()
      onClose && onClose()
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Failed to upload images",
      })
    }
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
              // onChange={onChange}
              setFile={(name, file) => {
                console.log("Setting file: ", name, file.fileSize)
                setValue(name, file)
              }}
              value={value as any}
              buttonText="Upload product image"
              withPreview
            />
            {error && <Text text={error.message} style={{ color: "red" }} />}
          </View>
        )}
      />
      <Button
        testID="submit-produt-button"
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
