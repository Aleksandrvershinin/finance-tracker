import { useUserStore } from '@/entities/user/lib/useUserStore'
import { accessToken } from '@/shared/api/accessToken.api'
import { apiAxios, apiAxiosWithAuthToken } from '@/shared/api/axiosInstance'
import { create } from 'zustand'

interface AuthState {
    token: string | null
    isAuth: boolean
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    token: accessToken.getToken(),
    isAuth: false,

    login: async (email, password) => {
        try {
            const response = await apiAxios.post('/auth/login', {
                email,
                password,
            })
            const token = response.data.accessToken
            accessToken.setToken(token)
            set({ token, isAuth: true })
            return true
        } catch (error) {
            console.error('Ошибка входа', error)
            return false
        }
    },

    logout: () => {
        accessToken.removeToken()
        set({ token: null, isAuth: false })
    },

    checkAuth: async () => {
        try {
            const response = await apiAxiosWithAuthToken.get('/users/profile')
            if (response.data) {
                useUserStore.getState().setUser(response.data.user)
                set({ isAuth: true })
            } else {
                set({ isAuth: false })
            }
        } catch (error) {
            console.error('Ошибка проверки авторизации', error)
            set({ isAuth: false })
        }
    },
}))
