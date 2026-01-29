import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IStore {
    hiddenTags: boolean

    toggleAccountGroup: (payload: boolean) => void
}


export const useTagAccountStore = create<IStore>()(
    persist(
        (set) => ({
            hiddenTags: true,

            toggleAccountGroup(payload) {
                set({ hiddenTags: payload })
            },

        }),
        {
            name: 'account-tags-hidden',
        }
    )
)