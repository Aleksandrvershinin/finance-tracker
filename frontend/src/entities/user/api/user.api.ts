import { apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import { userSchema } from '../types/user.types'

class UserApi {
    async getProfile() {
        const res = await apiAxiosWithAuthToken.get('/users/profile')
        return userSchema.parse(res.data.user)
    }
}

export const userApi = new UserApi()
