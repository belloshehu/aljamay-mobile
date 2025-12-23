import { AxiosInstance } from "axios"
import { ProfileResponseType } from "types/profile.types"

export class ProfileServiceAPI {
  // Add profile-related API methods here in the future
  static async updateProfile({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance
    payload: { firstName?: string; lastName?: string; photoUrl?: string; phoneNumber?: string }
  }) {
    const { data } = await protectedRequest.patch<ProfileResponseType>("/native/profile", payload)
    return data.data
  }
}
