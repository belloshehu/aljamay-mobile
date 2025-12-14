import { z } from "zod"

export const shippingAddressValidationSchema = z.object({
  firstName: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  streetAddress: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  postalCode: z.string().optional(),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true).optional(),
})

export type ShippingAddressValidationSchemaType = z.infer<typeof shippingAddressValidationSchema>
