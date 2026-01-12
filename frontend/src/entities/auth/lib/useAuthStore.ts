import { create } from 'zustand'
import { TTypeComponent } from '../types/auth.types'

interface AuthState {
    typeComponent: TTypeComponent
    setComponent: (payload: TTypeComponent) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    typeComponent: 'login',
    setComponent(typeComponent) {
        set({ typeComponent })
    },
}))
