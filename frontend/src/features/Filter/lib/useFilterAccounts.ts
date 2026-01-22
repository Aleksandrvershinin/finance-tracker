import { TAccount } from '@/entities/account/types/account.types'
import { useFilterStore } from './useFilterStore'

export const useFilterAccounts = (
    accounts: TAccount[],
) => {
    const selectedGroupIds = useFilterStore().selectedGroupIds
    const selectedAccountIds = useFilterStore().selectedAccountIds
    return accounts.filter((account) => {
        const byAccount =
            selectedAccountIds.length === 0 ||
            selectedAccountIds.includes(account.id)

        const byGroup =
            selectedGroupIds.length === 0
                ? true
                : account.groupAccount &&
                selectedGroupIds.includes(account.groupAccount.id)

        return byAccount && byGroup
    })
}
