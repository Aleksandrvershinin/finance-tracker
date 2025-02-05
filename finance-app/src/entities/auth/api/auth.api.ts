import { apiAxios, apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import { loginResponseSchema, TAuthForm } from '../types/auth.types'

class AuthApi {
    async login(data: TAuthForm) {
        const res = await apiAxios.post('/auth/login', data)
        return loginResponseSchema.parse(res.data)
    }

    // async refreshTokens() {
    //     return apiAxios.get('/refresh-tokens')
    // }

    async logout() {
        return apiAxiosWithAuthToken.get('/auth/logout')
    }
}

export const authApi = new AuthApi()
