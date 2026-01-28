import { TAccount } from '@/entities/account/types/account.types'
import { useFilterStore } from './useFilterStore'

export const useFilterAccounts = (
    accounts: TAccount[],
) => {
    const selectedGroupIds = useFilterStore().selectedGroupIds
    const selectedTagIds = useFilterStore().selectedTagIds
    const selectedAccountIds = useFilterStore().selectedAccountIds
    return accounts.filter((account) => {
        const byTag =
            selectedTagIds.length === 0
                ? true
                : account.accountTag &&
                selectedTagIds.includes(account.accountTag.id)

        const byAccount =
            selectedAccountIds.length === 0 ||
            selectedAccountIds.includes(account.id)

        const byGroup =
            selectedGroupIds.length === 0
                ? true
                : account.accountGroup &&
                selectedGroupIds.includes(account.accountGroup.id)

        return byAccount && byGroup && byTag
    })
}
