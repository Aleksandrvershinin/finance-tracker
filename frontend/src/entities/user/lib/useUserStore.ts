import { create } from 'zustand'
import { TUser } from '../types/user.types'

interface UserState {
    user: TUser | null
    setUser: (user: TUser) => void
    clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}))
