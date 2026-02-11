import { TagAccountsWithSum } from '@/entities/account/lib/useAccountsByTag'
import { TTagAccount } from '../../types/tagAccount.types'
import { useAuth } from '@/features/auth/lib/useAuth'
import { FaEdit } from 'react-icons/fa'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
    handleClickForEdit: (tag: TTagAccount) => void
    tag: TagAccountsWithSum
}

export const DraggableSumAccounTagItem = ({
    tag,
    handleClickForEdit,
}: Props) => {
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({
            id: tag.id,
        })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    const { data: user } = useAuth()
    return (
        <div
            ref={setNodeRef}
            style={{ backgroundColor: tag.color, ...style }}
            className="rounded-2xl p-2 pt-0 text-white"
        >
            <div
                {...listeners}
                {...attributes}
                className="cursor-grab flex justify-center"
            >
                ⠿
            </div>
            <div className="flex justify-between">
                <div className="flex gap-x-2">
                    <p>{tag.name}</p>
                    <p>{tag.total.toLocaleString()}</p>
                    <p>{user?.currency.symbol}</p>
                </div>

                <button
                    title="Редактировать"
                    onClick={() => {
                        handleClickForEdit(tag)
                    }}
                >
                    <FaEdit className="text-blue-500" color="" size={20} />
                </button>
            </div>
        </div>
    )
}
