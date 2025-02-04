import { TUser } from '@/entities/user/types/user.types'
import { create } from 'zustand'

interface IStore {
    isLoading: boolean
    isAuth: boolean
    logout: () => void
    login: (payload: { email: TUser['email']; password: string }) => void
}

export const useAuthStore = create<IStore>((set) => ({
    isLoading: false,
    isAuth: false,
    async logout() {},
    async login(payload) {},
}))
