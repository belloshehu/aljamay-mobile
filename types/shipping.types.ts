import { ResponseType } from "./response.types"

export interface ShippingAddressType {
  id: string
  firstName: string
  lastName: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
  phoneNumber: string
  isDefault: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ShippingAddressResponseType extends ResponseType<ShippingAddressType[]> {
  data: ShippingAddressType[]
}

export interface SingleShippingAddressResponseType extends ResponseType<ShippingAddressType> {
  data: ShippingAddressType
}
