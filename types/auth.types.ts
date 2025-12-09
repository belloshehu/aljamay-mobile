export interface LoginPayload {
  email: string
  password: string
}

import { ResponseType } from "./response.types"

export interface UserType {
  email: string
  firstName: string
  lastName: string
  verified?: boolean
  role: UserRole
  id: string
  image?: string | null
  emailVerified: Date | null
}

export interface UserAuthType {
  user: UserType
}

export interface RefreshTokenType {
  refreshToken: string
  expiresIn: number
  token: string
}

export interface VerificationType {
  expiresIn: number
}
export type LoginResponseType = ResponseType<UserAuthType & RefreshTokenType>

export type RegisterResponseType = ResponseType<UserAuthType>
export type LogoutResponseType = ResponseType<UserAuthType>

export type GetUsersResponseType = ResponseType<UserType[]>
export type GetUserResponseType = ResponseType<UserType>
export type EmailVerificationCodeResponse = ResponseType<VerificationType>

export type UserRole = "ADMIN" | "USER"
