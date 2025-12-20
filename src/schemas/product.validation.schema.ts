import { productCategoryOptions } from "@/constants"
import { ImagePickerAsset } from "expo-image-picker"
import * as z from "zod"

const productCatoriesEnum = productCategoryOptions.map((item) => item.value) as string[]
const producCategoryAndFilterSchema = z.object({
  category: z.enum(productCatoriesEnum as [string, ...string[]]).default("all"),
  sortBy: z.enum(["price", "rating", "name"]).optional(),
})

export type ProductCategoryAndFilterSchemaType = z.infer<typeof producCategoryAndFilterSchema>

const MAX_IMAGE_SIZE = 1000000 // 1MB
const productCreateValidationSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    price: z.coerce
      .number()
      .min(0, { message: "Price must be a positive number" })
      .max(100000, { message: "Price must be less than 100,000" }),
    discount: z.coerce
      .number()
      .min(0, { message: "Discount must be a positive number" })
      .default(0),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.enum(productCatoriesEnum as [string, ...string[]]).default("all"),
    image: z
      .any()
      .refine((file) => !!file, "Image required")
      .refine((file) => file.fileSize < 1000000, "Image too large"),
    thumbnails: z.any().array().default([]),
    quantity: z.coerce.number().default(1),
  })
  .refine(
    (data) => {
      return data.discount < data.price
    },
    {
      error: "Discount must be lower than price.",
      path: ["discount"],
    },
  )

export type ProductCreateValidationSchemaType = z.infer<typeof productCreateValidationSchema>

// Validation schema for Product category

const productCategoryCreateValidationSchema = z.object({
  name: z.enum(productCatoriesEnum as [string, ...string[]]).default("all"),
  image: z.string().url({ message: "Invalid image URL" }),
  description: z.string().min(1, { message: "Description is required" }),
})

export type ProductCategoryValidationSchemaType = z.infer<
  typeof productCategoryCreateValidationSchema
>

export {
  producCategoryAndFilterSchema,
  productCreateValidationSchema,
  productCategoryCreateValidationSchema,
}
