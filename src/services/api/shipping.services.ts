import { ShippingValidationSchemaType } from "@/schemas/shipping.validation.schemas"

import { AxiosInstance } from "axios"
import {
  ShippingAddressResponseType,
  SingleShippingAddressResponseType,
} from "types/shipping.types"

class ShippingServiceAPI {
  // service method to fetch all shipping addresses by a user
  static async getShippingAddressesByUser({
    protectedRequest,
  }: {
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.get<ShippingAddressResponseType>("/shipping/")
    return data.data
  }

  // service method to fetch single address by id
  static async getShippingAddress({
    shippingAddressId,
    protectedRequest,
  }: {
    shippingAddressId: string
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.get<SingleShippingAddressResponseType>(
      "/shipping/" + shippingAddressId,
    )
    return data.data
  }

  // service method to get user's default shipping address
  static async getDefaultShippingAddress({
    protectedRequest,
  }: {
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.get<ShippingAddressResponseType>("/shipping/")
    return data.data
  }

  // service method to create/add new shipping address
  static async createShippingAddress({
    payload,
    protectedRequest,
  }: {
    payload: ShippingValidationSchemaType
    protectedRequest: AxiosInstance
  }) {
    const { data } = await protectedRequest.post<SingleShippingAddressResponseType>(
      "/shipping/",
      payload,
    )
    return data.data
  }

  // service method to update an existing shipping address
  static async updateShippingAddress({
    payload,
    shippingAddressId,
    protectedRequest,
  }: {
    protectedRequest: AxiosInstance
    payload: ShippingValidationSchemaType
    shippingAddressId: string
  }) {
    const { data } = await protectedRequest.patch<SingleShippingAddressResponseType>(
      "/shipping/" + shippingAddressId,
      payload,
    )
    return data.data
  }

  // service method to delete shipping address by id
  static async deleteShippingAddress({
    shippingAddressId,
    protectedRequest,
  }: {
    protectedRequest: AxiosInstance
    shippingAddressId: string
  }) {
    const { data } = await protectedRequest.delete<SingleShippingAddressResponseType>(
      "/shipping/" + shippingAddressId,
    )
    return data.data
  }
}

export default ShippingServiceAPI
