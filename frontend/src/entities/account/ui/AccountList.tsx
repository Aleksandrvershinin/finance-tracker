import Loading from '@/shared/components/Loading'
import { useAccountList } from '../lib/useAccountList'
import { useFilterAccounts } from '@/features/Filter/lib/useFilterAccounts'
import { groupingAccounts } from '../lib/groupingAccounts'
import { sortingGroupedAccounts } from '../lib/sortingGroupedAccounts'
import { SumByTags } from '@/entities/tagAccount/ui/SumByTags'
import { TotalBalance } from './TotalBalance'
import { DraggableAccountList } from './DraggableAccountList'

function AccountList() {
    const { data: accounts = [], isLoading } = useAccountList()

    const filteredAccounts = useFilterAccounts(accounts)
    const groupedAccounts = groupingAccounts(filteredAccounts)
    const sortedGroupedAccounts = sortingGroupedAccounts(groupedAccounts)
    const total = filteredAccounts.reduce((acc, item) => acc + item.balance, 0)

    return (
        <>
            <TotalBalance total={total} />
            <SumByTags accounts={accounts} />
            <DraggableAccountList groupedAccounts={sortedGroupedAccounts} />
            <Loading isShow={isLoading} />
        </>
    )
}

export default AccountList
