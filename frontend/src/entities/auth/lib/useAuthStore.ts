import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TEmailAuth } from '../types/auth.types'

const TEN_MINUTES = 10 * 60 * 1000
const TWO_MINUTES = 2 * 60 * 1000

const authStorage = {
    getItem: (name: string) => {
        const raw = localStorage.getItem(name)
        if (!raw) return null

        const { state, timestamp } = JSON.parse(raw)

        if (Date.now() - timestamp > TEN_MINUTES) {
            localStorage.removeItem(name)
            return null
        }

        return state
    },

    setItem: (name: string, value: any) => {
        localStorage.setItem(
            name,
            JSON.stringify({
                state: value,
                timestamp: Date.now(),
            }),
        )
    },

    removeItem: (name: string) => {
        localStorage.removeItem(name)
    },
}

interface AuthState {
    step: 'request code' | 'confirm code'
    email: TEmailAuth | null

    nextSendAt: number | null

    setEmailAuth: (payload: TEmailAuth | null) => void
    setStep: (payload: 'request code' | 'confirm code') => void
    setNextSendAt: () => void
    resetTimer: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            step: 'request code',
            email: null,

            nextSendAt: null,

            setEmailAuth(email) {
                set({ email })
            },

            setStep(step) {
                set({ step })
            },

            setNextSendAt() {
                set({ nextSendAt: Date.now() + TWO_MINUTES })
            },

            resetTimer() {
                set({ nextSendAt: null })
            },
        }),
        {
            name: 'auth-storage',
            storage: authStorage,
        },
    ),
)
