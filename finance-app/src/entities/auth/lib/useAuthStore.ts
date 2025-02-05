import { useUserStore } from '@/entities/user/lib/useUserStore'
import { accessToken } from '@/shared/api/accessToken.api'
import { create } from 'zustand'
import { TAuthForm, TSignupForm, TTypeComponent } from '../types/auth.types'
import { authApi } from '../api/auth.api'
import { userApi } from '@/entities/user/api/user.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

interface AuthState {
    typeComponent: TTypeComponent
    errorSignup: null | string
    isLoadingSignup: boolean
    errorLogin: null | string
    isLoadingLogin: boolean
    isLoadingCheckAuth: boolean
    isAuth: boolean
    setComponent: (payload: TTypeComponent) => void
    login: (payload: TAuthForm) => Promise<boolean>
    signup: (payload: TSignupForm) => Promise<boolean>
    logout: () => void
    checkAuth: () => Promise<void>
    setIsAuth: (payload: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    typeComponent: 'login',
    errorSignup: null,
    isLoadingSignup: false,
    errorLogin: null,
    isAuth: false,
    isLoadingLogin: false,
    isLoadingCheckAuth: false,
    setComponent(typeComponent) {
        set({ typeComponent })
    },
    login: async (data) => {
        set({ isLoadingLogin: true, errorLogin: null })

        try {
            const response = await authApi.login(data)
            accessToken.setToken(response.accessToken)
            useUserStore.getState().setUser(response.user)
            set({ isAuth: true })
            return true
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            set({ errorLogin: errorMessage })
            console.error(error)
            return false
        } finally {
            set({ isLoadingLogin: false })
        }
    },

    logout: () => {
        authApi.logout()
        accessToken.removeToken()
        set({ isAuth: false })
    },
    async signup(data) {
        set({ isLoadingSignup: true, errorSignup: null })
        try {
            const response = await authApi.signup(data)
            accessToken.setToken(response.accessToken)
            useUserStore.getState().setUser(response.user)
            set({ isAuth: true })
            return true
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            set({ errorSignup: errorMessage })
            console.error(error)
            return false
        } finally {
            set({ isLoadingSignup: false })
        }
    },
    checkAuth: async () => {
        set({ isLoadingCheckAuth: true })
        try {
            const user = await userApi.getProfile()
            if (user) {
                useUserStore.getState().setUser(user)
                set({ isAuth: true })
            } else {
                set({ isAuth: false })
            }
        } catch (error) {
            console.error(error)
            set({ isAuth: false })
        } finally {
            set({ isLoadingCheckAuth: false })
        }
    },
    setIsAuth(isAuth) {
        set({ isAuth })
    },
}))
