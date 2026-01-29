import Loading from '@/shared/components/Loading'
import { useAccountList } from '../lib/useAccountList'
import { useFilterAccounts } from '@/features/Filter/lib/useFilterAccounts'
import { ungroupedName, useGroupedAccounts } from '../lib/useGroupedAccounts'
import { useSortedAccounts } from '../lib/useSortedAccounts'
import { SumByTags } from '@/entities/tagAccount/ui/SumByTags'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useReorderAccountMutation } from '../lib/useReorderAccountMutation'
import { TotalBalance } from './TotalBalance'
import { AccountGroup } from './AccountGroup'

function AccountList() {
    const { mutate } = useReorderAccountMutation()

    const { data: accounts = [], isLoading } = useAccountList()

    const filteredAccounts = useFilterAccounts(accounts)
    const groupedAccounts = useGroupedAccounts(filteredAccounts)
    const sortedAccounts = useSortedAccounts(groupedAccounts)
    const total = filteredAccounts.reduce((acc, item) => acc + item.balance, 0)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return
        const activeId = active.id
        const overId = over.id
        if (activeId === overId) return

        const groupName =
            accounts.find((a) => a.id === activeId)?.accountGroup ||
            ungroupedName
        const groupAccounts = accounts
            .filter((a) => a.accountGroup?.name ?? ungroupedName === groupName)
            .sort((a, b) => a.order - b.order)

        const oldIndex = groupAccounts.findIndex((a) => a.id === activeId)
        const newIndex = groupAccounts.findIndex((a) => a.id === overId)

        const reorderedAccounts = arrayMove(
            groupAccounts,
            oldIndex,
            newIndex,
        ).map((acc, idx) => ({
            id: acc.id,
            order: idx,
            groupId: acc.accountGroup?.id || null,
        }))

        mutate(reorderedAccounts)
    }

    return (
        <>
            <TotalBalance total={total} />
            <SumByTags accounts={accounts} />
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="flex flex-col gap-y-8">
                    {sortedAccounts.map((group) => (
                        <AccountGroup key={group.name} group={group} />
                    ))}
                </div>
            </DndContext>
            <Loading isShow={isLoading} />
        </>
    )
}

export default AccountList
