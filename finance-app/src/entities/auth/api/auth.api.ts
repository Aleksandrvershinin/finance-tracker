import { apiAxios, apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'

class AuthApi {
    async login(login: string, password: string) {
        return apiAxiosWithAuthToken.post('/login', { login, password })
    }

    async refreshTokens() {
        return apiAxios.get('/refresh-tokens')
    }

    async logout() {
        return apiAxiosWithAuthToken.get('/logout')
    }
}

export const authApi = new AuthApi()
