import { TagAccountsWithSum } from '@/entities/account/lib/useAccountsByTag'
import { TTagAccount } from '../../types/tagAccount.types'
import { closestCenter, DndContext, DragOverEvent } from '@dnd-kit/core'
import { Fragment } from 'react/jsx-runtime'
import { DraggableSumAccounTagItem } from './DraggableSumAccounTagItem'
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useReorderAccountTagMutation } from '../../lib/useReorderAccountTagMutation'
import { useEffect, useState } from 'react'

type Props = {
    handleClickForEdit: (accountTag: TTagAccount) => void
    accounts: TagAccountsWithSum[]
}

export const DraggableSumAccounTagList = ({
    handleClickForEdit,
    accounts,
}: Props) => {
    const { mutate } = useReorderAccountTagMutation()
    const [localAccounts, setLocalAccounts] = useState(accounts)
    useEffect(() => {
        setLocalAccounts(accounts)
    }, [accounts])

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return
        const activeId = Number(active.id)
        const overId = Number(over.id)
        if (isNaN(activeId) || isNaN(overId) || activeId === overId) return

        setLocalAccounts((accounts) => {
            const oldIndex = accounts.findIndex((a) => a.id === activeId)
            const newIndex = accounts.findIndex((a) => a.id === overId)
            if (oldIndex === -1 || newIndex === -1) return accounts

            return arrayMove(accounts, oldIndex, newIndex)
        })
    }
    const handleDragEnd = () => {
        const payload = localAccounts.map((accountTag, index) => ({
            id: accountTag.id,
            order: index,
        }))
        mutate(payload)
    }
    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            collisionDetection={closestCenter}
        >
            <SortableContext
                items={localAccounts.map((a) => a.id)}
                strategy={verticalListSortingStrategy}
            >
                {localAccounts.map((tag) => (
                    <Fragment key={tag.id}>
                        <DraggableSumAccounTagItem
                            handleClickForEdit={handleClickForEdit}
                            tag={tag}
                        />
                    </Fragment>
                ))}
            </SortableContext>
        </DndContext>
    )
}
