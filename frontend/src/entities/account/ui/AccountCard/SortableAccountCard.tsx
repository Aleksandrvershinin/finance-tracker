import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AccountCard from './AccountCard'
import { TAccount } from '../../types/account.types'
interface AccountCardProps {
    account: TAccount
}
const SortableAccountCard = ({ account }: AccountCardProps) => {
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({ id: account.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style}>
            <AccountCard
                attributes={attributes}
                listeners={listeners}
                account={account}
            />
        </div>
    )
}

export default SortableAccountCard
