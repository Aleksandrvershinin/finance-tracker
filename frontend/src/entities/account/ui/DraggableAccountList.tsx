import { closestCenter, DndContext, DragOverEvent } from '@dnd-kit/core'
import { GroupedAccounts, ungrouped } from '../lib/groupingAccounts'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { useReorderAccountMutation } from '../lib/useReorderAccountMutation'
import { useThrottle } from '@/shared/lib/hooks/useThrottle'
import { useDebouncedCallback } from '@/shared/lib/hooks/useDebouncedCallback'
import { AccountGroups } from './AccountGroups'

type Props = {
    groupedAccounts: GroupedAccounts[]
}
export const DraggableAccountList = ({ groupedAccounts }: Props) => {
    const { mutate } = useReorderAccountMutation()
    const [localGroups, setLocalGroups] = useState(groupedAccounts)
    useEffect(() => {
        setLocalGroups(groupedAccounts)
    }, [groupedAccounts])

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return
        const activeId = Number(active.id)
        const overId = Number(over.id)
        const activeGroupId = active.data.current?.groupId
        const overGroupId = over.data.current?.groupId

        if (!activeGroupId || !overGroupId || isNaN(activeId) || isNaN(overId))
            return

        setLocalGroups((groups) => {
            const newGroups = structuredClone(groups)

            const activeGroup = newGroups.find((g) => g.id === activeGroupId)
            const overGroup = newGroups.find((g) => g.id === overGroupId)
            if (!activeGroup || !overGroup) return groups

            // --- ВНУТРИ ОДНОЙ ГРУППЫ ---
            if (activeGroupId === overGroupId) {
                const oldIndex = activeGroup.accounts.findIndex(
                    (a) => a.id === activeId,
                )
                const newIndex = activeGroup.accounts.findIndex(
                    (a) => a.id === overId,
                )
                if (oldIndex === -1 || newIndex === -1) return groups

                activeGroup.accounts = arrayMove(
                    activeGroup.accounts,
                    oldIndex,
                    newIndex,
                )

                return newGroups
            }

            // --- МЕЖДУ ГРУППАМИ ---
            const oldIndex = activeGroup.accounts.findIndex(
                (a) => a.id === activeId,
            )
            if (oldIndex === -1) return groups

            const [moved] = activeGroup.accounts.splice(oldIndex, 1)

            const newIndex = overGroup.accounts.findIndex(
                (a) => a.id === overId,
            )
            overGroup.accounts.splice(
                newIndex < 0 ? overGroup.accounts.length : newIndex,
                0,
                moved,
            )

            return newGroups
        })
    }
    const handleDragEnd = () => {
        const payload = localGroups.flatMap((group) =>
            group.accounts.map((account, index) => ({
                id: account.id,
                order: index,
                groupId: group.id === ungrouped ? null : Number(group.id),
            })),
        )
        mutate(payload)
    }
    const throttledDragOver = useThrottle(handleDragOver, 50)
    const debouncedDragEnd = useDebouncedCallback(handleDragEnd, 300)
    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={debouncedDragEnd}
            onDragOver={throttledDragOver}
        >
            <AccountGroups groups={localGroups} />
        </DndContext>
    )
}
