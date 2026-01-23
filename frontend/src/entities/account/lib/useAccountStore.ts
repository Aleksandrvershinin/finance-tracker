import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IStore {
    hiddenAccountGroupIds: Record<string, boolean>

    toggleAccountGroup: (groupId: string) => void
    setAccountGroupHidden: (groupId: string, hidden: boolean) => void
}

export const useAccountStore = create<IStore>()(
    persist(
        (set) => ({
            hiddenAccountGroupIds: {},

            toggleAccountGroup(groupId) {
                set((state) => ({
                    hiddenAccountGroupIds: {
                        ...state.hiddenAccountGroupIds,
                        [groupId]: !state.hiddenAccountGroupIds[groupId],
                    },
                }))
            },

            setAccountGroupHidden(groupId, hidden) {
                set((state) => ({
                    hiddenAccountGroupIds: {
                        ...state.hiddenAccountGroupIds,
                        [groupId]: hidden,
                    },
                }))
            },
        }),
        {
            name: 'account-groups-visibility',
        }
    )
)